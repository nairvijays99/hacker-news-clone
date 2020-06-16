import React from 'react';
import nock from 'nock'; 
import userEvent from '@testing-library/user-event';
import {
 render,
 cleanup,
 waitForElement
} from '@testing-library/react';
import 'jest-dom/extend-expect';


import App from '../App'; 