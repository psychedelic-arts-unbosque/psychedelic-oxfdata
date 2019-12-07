import styled from 'styled-components';
import { ReactElement } from 'react';
import { Style } from 'jss';
import { Box } from '@material-ui/core';
import React = require('react');
import { BoxProps } from '@material-ui/core/Box';

const FlexboxStyled: Style = styled(Box).attrs({
    display: 'flex'
})`
    width: 100%;
`;


const Flexbox = (
    props: BoxProps
): ReactElement => {
    return(
        <FlexboxStyled {...props} ></FlexboxStyled>
    )
}

export default Flexbox;