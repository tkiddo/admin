import React, { FC, Fragment } from 'react';

const PublicLayout: FC = (props) => {
  return <Fragment>{props.children}</Fragment>;
};

export default PublicLayout;
