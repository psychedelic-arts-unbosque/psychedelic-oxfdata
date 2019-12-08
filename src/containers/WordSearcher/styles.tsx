import styled from 'styled-components';
import Flexbox from '../../components/Flexbox';
import { FormControl, Button } from '@material-ui/core';

export const WordSearcherWrapper = styled(Flexbox)`
    box-sizing: border-box;
`;

export const FormGroupWrapper = styled(WordSearcherWrapper).attrs({
    flexDirection: 'column'
})``;

export const FormControlSized = styled(FormControl)`
    width: 90%;
`;

export const ActionButton = styled(Button).attrs({
    variant: 'contained',
})``;