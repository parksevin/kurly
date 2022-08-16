import React from 'react';
import MemberComponent  from './MemberComponent.js';

const MainComponent = ({modal,modalShowFn}) => {
  return (
    <main id="main">
        <MemberComponent modal={modal} modalShowFn={modalShowFn} />
    </main>
  );
};

export default MainComponent;