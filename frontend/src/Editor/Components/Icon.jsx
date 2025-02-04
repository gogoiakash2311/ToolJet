import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import * as Icons from '@tabler/icons';
import cx from 'classnames';

export const Icon = ({ properties, styles, fireEvent, width, height, registerAction, darkMode }) => {
  const { icon } = properties;
  const { iconColor, visibility } = styles;
  const IconElement = Icons[icon];

  const color = iconColor === '#000' ? (darkMode ? '#fff' : '#000') : iconColor;

  const [showIcon, setIconVisibility] = useState(true);

  useEffect(() => {
    showIcon !== visibility && setIconVisibility(visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility]);

  registerAction(
    'setVisibility',
    async function (visibility) {
      setIconVisibility(visibility);
    },
    [setIconVisibility]
  );

  registerAction('click', async function () {
    fireEvent('onClick');
  });

  return (
    <div className={cx('icon-widget', { 'd-none': !showIcon })}>
      <IconElement
        color={color}
        style={{ width, height }}
        onClick={(event) => {
          event.stopPropagation();
          fireEvent('onClick');
        }}
        onMouseOver={(event) => {
          event.stopPropagation();
          fireEvent('onHover');
        }}
      />
    </div>
  );
};
