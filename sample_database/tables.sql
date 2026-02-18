-- Tabela aluno
create table if not exists public.aluno (
    RA bigint not null check (RA > 0) UNIQUE,
    nome varchar(50) not null,
    senha real not null,
    email varchar(50),
    curso varchar(50),
    multa real default 0,
    emprestados jsonb default null,

    primary key (RA)
);

-- Tabela Funcionarios
create table if not exists public.funcionario (
    matricula bigint not null check (matricula > 0) UNIQUE,
    nome varchar(50) not null,
    senha real not null,
    email varchar(50),

    primary key (matricula)
);


-- Tabela livros
create table if not exists public.livro (
    id bigint not null default nextval('livro_id_sequence') check (id > 0),
    titulo varchar (150),
    autor varchar(50),
    categoria varchar(15),
    disponibilidade boolean default true,

    primary key(id)

);

-- Tabela emprestimos
create table if not exists public.emprestimo (
    livro_id bigint not null UNIQUE,
    aluno_RA bigint not null,
    horario timestamp not null,
    devolucao date not null,

    foreign key(livro_id) references public.livro (id),
    foreign key(aluno_RA) references public.aluno (RA)
);