-- Indexes
create index idxAtrasado on public.aluno((emprestados->>'devolucao'));

create index idxMulta on public.aluno(multa) where multa > 0;

create index idxDisponivel on public.livro(disponibilidade) where disponibilidade = true;

create index idxEmprestimo on public.emprestimo(livro_id,aluno_RA,devolucao);