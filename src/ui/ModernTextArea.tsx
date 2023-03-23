import { css, cx } from '@emotion/css';
import { FormEventHandler, useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

type Props = {
  onChange?: (value: string) => void;
  value?: string;
};

const ROOT_STYLE = css({
  '&.modern-text-area': {
    backgroundColor: 'rgba(0, 0, 255, .1)',
    position: 'relative'
  },

  '& .modern-text-area__doppelganger': {
    backgroundColor: 'rgba(255, 0, 0, .2)',
    color: 'rgba(255, 0, 0, .4)',
    fontFamily: 'Consolas, monospace',
    whiteSpace: 'pre-wrap'
  },

  '& .modern-text-area__text-area': {
    backgroundColor: 'rgba(0, 255, 0, .2)',
    border: 0,
    color: 'rgba(0, 0, 255, .4)',
    flex: 1,
    fontFamily: 'Consolas, monospace',
    fontSize: 'inherit',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  }
});

const TextArea = ({ onChange, value }: Props) => {
  const onChangeRef = useRefFrom(onChange);

  const handleChange = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => onChangeRef.current?.(value || ''),
    [onChangeRef]
  );

  return (
    <div className={cx('modern-text-area', ROOT_STYLE)}>
      <div className="modern-text-area__doppelganger">{value}</div>
      <textarea autoFocus={true} className="modern-text-area__text-area" onChange={handleChange} value={value || ''} />
    </div>
  );
};

export default TextArea;
