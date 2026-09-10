import './style.css'

function Categoria() {

  const categoria = [
    {
      id: '1',
      nome: 'ALUGUEL',
      tipo: 'DESPESA'
    }, {
      id: '2',
      nome: 'SALARIO',
      tipo: 'RECEITA'
    }
  ]
 

  return (
     
        <div className='container'>
          <form action="">
            <h1>Cadastro de categoria</h1>
            <input placeholder="Nome da categoria" type="text" name='nome'/>
            <input placeholder="Tipo da categoria" type="text" name='tipo'/>
            <button type='button'>Salvar</button>
          </form>

          {categoria.map( user => (
            
            <div key= {user.id} className='card'>
              <div>
                <p>Nome: <span>{user.nome}</span></p>
                <p>Tipo: <span>{user.tipo}</span></p>
              </div>
              <div className='buttonCard'>
                <button type="button">X</button>
              </div>
            </div>

          ))}

          
        
        </div>
  )
}

export default Categoria
