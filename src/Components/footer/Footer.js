import { SocialIcon } from 'react-social-icons';
import { ReactComponent as Logo } from '../../assets/koya-logo.svg';

const Footer = () => {
    return (
        <div className="container">
            <footer className="flex flex-row">
                <div className="col-3 mx-auto">
                    <Logo className="bg-danger mx-3"/>
                    <p>Koya est une marque déposée auprès de l'INPI</p>
                    <small>
                        2021 Copyright &copy;<script>document.write(new Date().getFullYear());</script> | All rights reserved by Koya.fr
                    </small>
                </div>
                <div className="col-3 ">
                    <h5 className="text-uppercase">Menu</h5>
                    <p>
                        <a href="{ # }" className="text-decoration-none text-dark">Accueil</a>
                    </p>
                    <p>
                        <a href="{ # }" className="text-decoration-none text-dark">Article</a>
                    </p>
                    <p>
					    <a href="{ # }" className="text-decoration-none text-dark">Blog</a>
				    </p>
                    <p>
					    <a href="{ # }" className="text-decoration-none text-dark">Connexion</a>
				    </p>
                </div>
                <div className="col-3">
                    <h5 className="text-uppercase">Contact</h5>
                    <small>Email: contact@koya-app.fr</small>
                    <small>Site : https://www.home.koya-app.fr</small>
                </div>
                <div className="col-3 mx-auto">
                    <h5>Deviens Koyacteur</h5>
                    <form action="">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Email"/>
                            <button className="btn btn-outline-info text-dark">Je m'inscrire</button>
                        </div>
                    </form>
                    <div className="my-5">
                        <h5>NOS RÉSEAUX</h5>
                        <SocialIcon url="https://linkedin.com/in/jaketrent" bgColor="#085E6D" className="mx-1"/>
                        <SocialIcon network="facebook" bgColor="#EE525E" className="mx-1"/>
                        <SocialIcon network="twitter" bgColor="#EE525E" className="mx-1"/>
                        <SocialIcon network="instagram" bgColor="#EE525E" className="mx-1"/>
                    </div>
                </div>
                <hr />
                <div class="container bg-light">
                    <div class="text-center">
                        <div class="">
                            <small>
                                Copyright &copy;<script>document.write(new Date().getFullYear());</script> | All rights reserved by Le Bon Plan
                            </small>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;