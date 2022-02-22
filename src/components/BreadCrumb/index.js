import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { Wrapper, Content } from "./BreadCrumb.styles";

const BreadCrumb = ({movieTitle}) => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <span>
                    Home
                </span>
                <span>|</span>
            </Link>
            <span>{movieTitle}</span>
        </Content>
    </Wrapper>
);

BreadCrumb.propTypes = {
    movieTitle: PropTypes.string
}

export default BreadCrumb;