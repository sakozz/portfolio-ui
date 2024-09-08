import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
  return (
    <footer className=" bg-secondary-50 py-16 text-secondary-950 text-center font-light mt-20">
      <div className="container mx-auto grid lg:grid-cols-4 gap-8">
        <nav className="col-span-2">
          <h4 className="text-xl">About</h4>
          <p className="text-sm  mt-2">
            "Portfolio Me" is a portfolio website built as learning as well as showcase application
            which can be used as a portfolio for web developers. This application is built using
            React and Tailwind CSS. The APIs for this application is served with NestJS. Both
            repositories are available on GitHub with MIT license.
          </p>
        </nav>
        <nav className="flex flex-col items-center">
          <h4 className="text-xl mb-4">Github Repositories</h4>
          <ul className="list-disc text-start">
            <li>
              <FontAwesomeIcon icon={['fab', 'github']} className="me-2" /> Frontend: ReactJs
            </li>
            <li>
              <FontAwesomeIcon icon={['fab', 'github']} className="me-2" />
              Backend: NestJs
            </li>
          </ul>
        </nav>
        <nav className="flex flex-col gap-4">
          <a className="text-xl">Contact Me</a>
          <div>
            <FontAwesomeIcon icon={['fab', 'github']} className="me-2" size="2xl" />
            <FontAwesomeIcon icon={['fab', 'linkedin']} className="me-2" size="2xl" />
          </div>
        </nav>
      </div>
    </footer>
  );
}
