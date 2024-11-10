import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <footer className=" bg-secondary-50 py-16 text-secondary-950 text-center font-light mt-20">
      <div className="container mx-auto grid lg:grid-cols-4 gap-8">
        <nav className="col-span-2">
          <h4 className="text-xl">About</h4>
          <p className="text-sm  mt-2">
            "Portfolio" is a portfolio website built as learning as well as showcase application
            which can be used as a portfolio for web developers. This application is built using
            React and Tailwind CSS. The APIs for this application is served with NestJS. Both
            repositories are available on GitHub with MIT license.
          </p>
        </nav>
        <nav className="flex flex-col items-center">
          <h4 className="text-xl mb-4">Links</h4>
          <div className="text-start flex flex-col gap-2 ">
            <a href="https://github.com/sakozz/portfolio-ui" target="_blank">
              <FontAwesomeIcon icon={['fab', 'github']} className="me-2" /> Frontend: ReactJs
            </a>
            <a href="https://github.com/sakozz/portfolio-api" target="_blank">
              <FontAwesomeIcon icon={['fab', 'github']} className="me-2" />
              Backend: NestJs
            </a>
            <NavLink to="/auth">
              <FontAwesomeIcon icon="sign-in" className="me-2" />
              Manage Your Profile
            </NavLink>
          </div>
        </nav>
        <nav className="flex flex-col gap-4">
          <a className="text-xl">Find me at</a>
          <div>
            <a href="https://linkedin.com/in/sunilz" target="_blank">
              <FontAwesomeIcon icon={['fab', 'linkedin']} className="me-2" size="2xl" />
            </a>
            <a href="http://github.com/sakozz" target="_blank">
              <FontAwesomeIcon icon={['fab', 'github']} className="me-2" size="2xl" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
