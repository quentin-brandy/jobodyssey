import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root , {loader as Rootloader} from './routes/root.jsx';
import './index.css';
import Home  , {loader as Homeloader}from './routes/home.jsx';
import PageCreationOffre , {loader as CréationOffreloader} from './routes/créationoffre.jsx';
import Connexion from './component/Form/Connexion.jsx';
import Inscription  from './routes/inscription.jsx';
import InscriptionEntrepriseRoute , {loader as Inscriptionloader} from './routes/entrepriseconnexion.jsx';
import Account , {loader as Accountloader} from './routes/account.jsx';
import  OffreModificationRoute , {loader as OffreModifyloader} from './routes/offremodifier.jsx';
import OffreCandidature , {loader as OffreCandidatureloader} from './routes/offrecandidature.jsx';
import RechercheOffre , {loader as RechercheOffreloader} from './routes/rechercheoffre.jsx';
import Offre , {loader as Offreloader} from './routes/offre.jsx';
import {  useLocation } from "react-router-dom";
import InscriptionUserRoute from "./routes/userconnexion.jsx";
import AccountEntreprise , {loader as AccountEntrepriseloader} from './routes/accountentreprise.jsx';
import AccountUser , {loader as AccountUserloader} from './routes/accountuser.jsx';
import AccountEntrepriseUserPresentation , {loader as CandidatureUserloader} from './routes/accountentrepriseuserpresentation.jsx';
import EntrepriseSearch , {loader as Entreprisesearchloader} from './routes/entreprisesearch.jsx';
import EntreprisePage , {loader as Entrepriseloader} from './routes/entreprisepage.jsx';
import Routechat , {loader as Chatloader} from './routes/chat.jsx';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token && location.pathname !== "/connexion") {
    window.location.href = "/connexion";
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: Rootloader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: Homeloader,
      },
      {
        path: "/offre/ajout",
      
        element:(  <ProtectedRoute>
          <PageCreationOffre />
        </ProtectedRoute>),
        loader: CréationOffreloader,
      },
      {
      path: "/offre/:offreid",
      element: <Offre />,
      loader: Offreloader,
    },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/inscription/entreprise",
        element: <InscriptionEntrepriseRoute />,
        loader: Inscriptionloader,
      },
      {
        path: "/inscription/particulier",
        element: <InscriptionUserRoute />,
        loader: Inscriptionloader,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        loader: Accountloader,
      },
      {
      path: "/recherche/entreprise",
      element: (
          <EntrepriseSearch />
      ),
      loader: Entreprisesearchloader,
    },
    {
      path: "/entreprise/:entrepriseid",
      element: (
          <EntreprisePage />
      ),
      loader: Entrepriseloader,
    },
      {
        path: "/profile/company",
        element: (
          <ProtectedRoute>
            <AccountEntreprise/>
          </ProtectedRoute>
        ),
        loader: AccountEntrepriseloader,
      },
      {
        path: "/profile/user",
        element: (
          <ProtectedRoute>
            <AccountUser />
          </ProtectedRoute>
        ),
        loader: AccountUserloader,
      },
      {
        path: "/profile/company/offre/modifier/:offreid",
        element: (
          <ProtectedRoute>
            <OffreModificationRoute />
          </ProtectedRoute>
        ),
        loader: OffreModifyloader,
      },
      {
        path: "/profile/company/offre/candidature/:offreid/:userid/chat",
        element: (
          <ProtectedRoute>
            <Routechat />
          </ProtectedRoute>
        ),
        loader: Chatloader,
      },
      {
        path: "/profile/user/:offreid/:userid/chat",
        element: (
          <ProtectedRoute>
            <Routechat />
          </ProtectedRoute>
        ),
        loader: Chatloader,
      },
      {
        path: "/profile/company/offre/candidature/:offreid",
        element: (
          <ProtectedRoute>
            <OffreCandidature />
          </ProtectedRoute>
        ),
        loader: OffreCandidatureloader,
      },
      {
        path: "/profile/company/offre/modifier/:offreid",
        element: (
          <ProtectedRoute>
            <OffreModificationRoute />
          </ProtectedRoute>
        ),
        loader: OffreModifyloader,
      },
      {
        path: "/profile/company/offre/candidature/:offreid/:userid",
        element: (
          <ProtectedRoute>
            <AccountEntrepriseUserPresentation />
          </ProtectedRoute>
        ),
        loader: CandidatureUserloader,
      },
      {
        path: "/recherche/offre",
        element: <RechercheOffre />,
        loader: RechercheOffreloader,
      },
      
    ],
  },
]);


const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
} else {
  console.error('No root element found');
}

