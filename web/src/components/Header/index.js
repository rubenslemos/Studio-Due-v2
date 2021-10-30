const Header = () => {
  return (
    <header className="container-fluid d-flex justify-content-end">
      <div className="d-flex align-items-center">
        <div>
          <span className="d-block m-0 p-0">Studio Due</span>
          <small>Administrador</small> 
        </div>
        <img src="https://salao-studio-due.s3.sa-east-1.amazonaws.com/servicos/61607e0ec1bb4c1e46cc5830/studio-due.png" alt="Logo"/>
        <span className="mdi mdi-chevron-down"></span>
      </div>
    </header>
    );
}

export default Header