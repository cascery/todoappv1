/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState,useRef } from 'react';

import './loggin.css';
import React, { useEffect } from 'react';



export const Loading=()=>{


    setTimeout(function() {
        window.location.href = '/todos';
      }, 3000);

      window.history.pushState({}, '', '/todos');
return(

<div className='hearting'>
    
<div className='heart1'></div>
<div className='heart2'></div>
<div className='heart3'></div>
</div>
);






}