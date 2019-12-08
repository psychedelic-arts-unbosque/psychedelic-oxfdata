import styled from 'styled-components';
import { Style } from 'jss';
import { Box } from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box';
import * as React from "react";

const FlexboxStyled: Style = styled(Box).attrs({
    display: 'flex'
})`
    width: 100%;
`;


const Flexbox = (
    props: BoxProps
): React.ReactElement => {
    return(
        <FlexboxStyled {...props} ></FlexboxStyled>
    )
}

export default Flexbox;