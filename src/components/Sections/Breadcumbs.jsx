import React from "react";

// Components
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {

});


export default function Breadcumbs(page) {
  const location = useLocation();

  return (
    <>
      <div className="container">
        <div role="presentation" className="asik-breadcrumbs">
          <Breadcrumbs aria-label="breadcrumb" >
            <StyledBreadcrumb
              component="a"
              href="#"
              className="no-button"
              label="Beranda"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" className="no-button" href="#" label="Profil" />
            <StyledBreadcrumb
              label={location.pathname}
              className="active-page"
              deleteIcon={<ExpandMoreIcon />}

            />
          </Breadcrumbs>
        </div>
      </div>
   
    </>

  );
}


