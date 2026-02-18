-- Função para calculo de multa

create or replace function calculo_multa (devolucao_aux date)
returns real as $$
begin
    return CURRENT_DATE - devolucao_aux;
end
$$ language plpgsql;

-- Função para simular emprestimos

create or replace function simular_emprestimo(numero_de_emprestimos int)
returns boolean as $$
declare
    tamanho_aluno int;
    tamanho_livro int;
    aluno_RA_aux bigint;
    livro_id_aux bigint;
    random_day timestamp;
    disponibilidade_aux boolean;
    multa_aux int;
begin
    select count(*) into tamanho_aluno from public.aluno;
    select count(*) into tamanho_livro from public.livro;
    for i in 1.. numero_de_emprestimos
    loop
        SELECT RA into aluno_RA_aux FROM public.aluno OFFSET floor(random()*tamanho_aluno) LIMIT 1;
        SELECT id into livro_id_aux FROM public.livro OFFSET floor(random()*tamanho_livro) LIMIT 1;
        select NOW() - (random() * (interval '5 days')) into random_day;
        select disponibilidade into disponibilidade_aux from public.livro where public.livro.id = livro_id_aux;
        select multa into multa_aux from public.aluno where public.aluno.RA = aluno_RA_aux;
        if disponibilidade_aux is true
        then
            if multa_aux = 0
            then
                insert into public.emprestimo (livro_id, aluno_RA, horario, devolucao) values (livro_id_aux, aluno_RA_aux, random_day, CAST (random_day + INTERVAL '7 day' as date));
            end if;
        end if;
    end loop;
    return true;
end
$$ language plpgsql;

-- Função para simular devolucoes

create or replace function simular_devolucao(numero_de_devolucoes int)
returns boolean as $$
declare
    tamanho_emprestimo int;
    livro_id_aux bigint;
begin
    select count(*) into tamanho_emprestimo from public.emprestimo;
    for i in 1.. numero_de_devolucoes
    loop
        SELECT livro_id into livro_id_aux FROM public.emprestimo OFFSET floor(random()*tamanho_emprestimo) LIMIT 1;
        DELETE FROM public.emprestimo WHERE livro_id = livro_id_aux;
    end loop;
    return true;
end
$$ language plpgsql;


-- Trigger Para Emprestimos de Livros
CREATE OR REPLACE FUNCTION emprestimo_livro()
RETURNS trigger AS $empr$
DECLARE 
    aluno_RA_aux bigint;
    livro_id_aux bigint;
    devolucao_aux date;
    emprestados_aux jsonb;
    disponibilidade_aux boolean;
    multa_aux real;
BEGIN
    select RA into aluno_RA_aux from public.aluno where public.aluno.RA = new.aluno_RA;
	select id into livro_id_aux from public.livro where public.livro.id = new.livro_id;
    select multa into multa_aux from public.aluno where public.aluno.RA = new.aluno_RA;
    select devolucao into devolucao_aux from public.emprestimo where devolucao = new.devolucao;
    select disponibilidade into disponibilidade_aux from public.livro where public.livro.id = new.livro_id;
    select emprestados into emprestados_aux from public.aluno where public.aluno.RA = new.aluno_RA; 

    if disponibilidade_aux is true
    then
        if multa_aux > 0
        then
            raise exception 'Aluno possui multa de % Reais a pagar', multa_aux
			using hint = 'Pague antes de adquirir outros livros';
        else
            if emprestados_aux is not null 
            then
                emprestados_aux := emprestados_aux::jsonb || (
                    '{ 
                        "' || livro_id_aux || '" :
                        {
                            "devolucao" :"' || devolucao_aux || '"
                        }
                    }'
                )::jsonb;
            else
                emprestados_aux := (
                    '{ 
                        "' || livro_id_aux || '" :
                        {
                            "devolucao" :"' || devolucao_aux || '"
                        }
                    }'
                )::jsonb;
            end if;    
            update public.aluno set emprestados = emprestados_aux where RA = aluno_RA_aux;
            update public.livro set disponibilidade = false where id = livro_id_aux;
        end if;
    end if;
    refresh materialized view emprestimo_livros;
RETURN NEW;
END;
$empr$ language plpgsql;

CREATE TRIGGER insert_emprestimo
AFTER INSERT ON emprestimo
FOR EACH ROW
EXECUTE PROCEDURE emprestimo_livro();


-- Trigger para devolucao de livros
CREATE OR REPLACE FUNCTION devolucao_livro() 
RETURNS TRIGGER AS $dvlc$
DECLARE
	livro_id_aux bigint;
	aluno_RA_aux bigint;
    multa_aux real;
    emprestados_aux jsonb;
	devolucao_aux date;
BEGIN
    select RA into aluno_RA_aux from public.aluno where public.aluno.RA = old.aluno_RA;
	select id into livro_id_aux from public.livro where public.livro.id = old.livro_id;
    select emprestados into emprestados_aux from public.aluno where public.aluno.RA = aluno_RA_aux;
    select multa into multa_aux from public.aluno where public.aluno.RA = aluno_RA_aux;
    select devolucao into devolucao_aux from public.emprestimo where old.livro_id = livro_id_aux;

	UPDATE public.aluno SET emprestados = emprestados_aux - CAST (livro_id_aux AS text) where public.aluno.RA = aluno_RA_aux;
    UPDATE public.livro SET disponibilidade = true where public.livro.id = livro_id_aux;
    if calculo_multa(old.devolucao) > 0
    then
        UPDATE public.aluno SET multa = multa_aux + calculo_multa(old.devolucao) where public.aluno.RA = aluno_RA_aux;
    end if;	
    refresh materialized view emprestimo_livros;
	return null;
END;
$dvlc$ language plpgsql;

CREATE TRIGGER delete_emprestimo
AFTER DELETE ON emprestimo
FOR EACH ROW
EXECUTE PROCEDURE devolucao_livro();

-- Materialized view para emprestimos

create materialized view emprestimo_livros (id_livro, titulo, RA_aluno, nome, horario, devolucao) 
as select 
	emprestimo.livro_id, 
	livro.titulo, 
	emprestimo.aluno_RA,
	aluno.nome,  
	emprestimo.horario,
    emprestimo.devolucao 
from public.emprestimo, public.livro, public.aluno
where public.emprestimo.livro_id = public.livro.id and public.emprestimo.aluno_RA = public.aluno.RA order by horario desc;

-- Auditoria emprestimo
create table if not exists audit.emprestimo (
    usuario varchar,
    data timestamp,
    operacao char,
    livro_id bigint not null,
    aluno_RA bigint not null,
    horario timestamp not null,
    devolucao date not null
);
-- Auditoria livro
create table if not exists audit.livro (
    usuario varchar,
    data timestamp,
    operacao char,
    id bigint not null,
    titulo varchar (150),
    autor varchar(50),
    categoria varchar(15),
    disponibilidade boolean
);
-- Auditoria da tabela emprestimo
create or replace function audit_emprestimo()
returns trigger as $audit_emp$
begin
    if (TG_OP = 'INSERT') 
    then
        insert into audit.emprestimo select user, now(), 'I', new.*;
        return new;
    elsif (TG_OP = 'DELETE') 
    then
        insert into audit.emprestimo select user, now(), 'D', old.*;
        return new;
    elsif (TG_OP = 'UPDATE') 
    then
        insert into audit.emprestimo select user, now(), 'U', new.*;
        return new;
    end if;

    return null;
end;
$audit_emp$ language plpgsql;

create trigger audit_emp
after insert or update or delete on public.emprestimo
for each row execute procedure audit_emprestimo();


-- Auditoria da tabela Livro
create or replace function audit_livro()
returns trigger as $audit_lvr$
begin
    if (TG_OP = 'INSERT') 
    then
        insert into audit.livro select user, now(), 'I', new.*;
        return new;
    elsif (TG_OP = 'DELETE') 
    then
        insert into audit.livro select user, now(), 'D', old.*;
        return new;
    elsif (TG_OP = 'UPDATE') 
    then
        insert into audit.livro select user, now(), 'U', new.*;
        return new;
    end if;

    return null;
end;
$audit_lvr$ language plpgsql;

create trigger audit_livro
after insert or update or delete on public.livro
for each row execute procedure audit_livro();