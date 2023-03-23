import { css, cx } from '@emotion/css';
import { useState } from 'react';

import ModernTextArea from './ModernTextArea';

const ROOT_STYLE = css({
  '&.app': {
    margin: 10,
    width: 360
  }
});

const App = () => {
  const [value, setValue] = useState(
    'Sint consectetur amet laboris duis nulla. Labore et occaecat est ut Lorem fugiat aute ad labore. Velit nulla anim officia cillum eu dolore veniam minim tempor. Amet eiusmod eu commodo irure aliquip ad nostrud eiusmod.\n\nVoluptate exercitation do fugiat dolore culpa do cillum aliqua nisi aliquip cillum reprehenderit non ipsum. Nulla veniam mollit mollit id cillum do. Quis ad incididunt exercitation consequat.\n\nFugiat deserunt aliquip sit ut adipisicing dolor ad minim irure anim et. Adipisicing mollit et occaecat sint commodo. Magna duis proident commodo amet.'
  );

  return (
    <main className={cx(ROOT_STYLE, 'app')}>
      <h1>Modern text area</h1>
      <p>Will highlight words starting or ending with letter "n".</p>
      <ModernTextArea onChange={setValue} value={value} />
    </main>
  );
};

export default App;
