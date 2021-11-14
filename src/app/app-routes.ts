export const AppRoutes = {
  Login: {
    base: () => "login",    
  },
  Clientes: {
    base: () => "clientes",
    Cadastro: () => { return AppRoutes.Clientes.base() + "/cad-cliente" },
  },
  Grupos: {
    base: () => "grupos",
    Cadastro: () => { return AppRoutes.Grupos.base() + "/cad-grupo" },
  },
  FormaPagamento: {
    base: () => "forma-pagamento",
    Cadastro: () => { return AppRoutes.FormaPagamento.base() + "/cad-forma-pagamento" },
  },
  Produto: {
    base: () => "produtos",
    Cadastro: () => { return AppRoutes.Produto.base() + "/cad-produto" },
  },
  Orcamento: {
    base: () => "orcamentos",
    Cadastro: () => { return AppRoutes.Orcamento.base() + "/cad-orcamento" },
  },
  Usuarios: {
    base: () => "usuarios",
    Cadastro: () => { return AppRoutes.Usuarios.base() + "/cad-usuario" },
  },
};