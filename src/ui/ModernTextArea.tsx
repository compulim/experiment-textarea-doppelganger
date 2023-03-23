import { css, cx } from '@emotion/css';
import { FormEventHandler, Fragment, useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

type Props = {
  onChange?: (value: string) => void;
  value: string;
};

const ROOT_STYLE = css({
  '&.modern-text-area': {
    backgroundColor: 'rgba(0, 0, 255, .1)',
    position: 'relative',

    '--highlighter-color': 'yellow',
    '--token-border-color': 'blue',
  },

  '& .modern-text-area__doppelganger': {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, .4)',
    fontFamily: 'Consolas, monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },

  '& .modern-text-area__text-area': {
    backgroundColor: 'transparent',
    border: 0,
    color: 'black',
    flex: 1,
    fontFamily: 'Consolas, monospace',
    fontSize: 'inherit',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    resize: 'none',
    top: 0,
    width: '100%'
  },

  '& .modern-text-area__word--highlight': {
    backgroundColor: 'var(--highlighter-color)',
    backgroundImage: 'url(./assets/images/squiggle.png)',
    backgroundPositionY: '100%',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto .5em',
    borderRadius: 4,
    opacity: 1,
    outlineColor: 'var(--token-border-color)',
    outlineStyle: 'dotted',
    outlineWidth: '2px'
  }
});

const TextArea = ({ onChange, value }: Props) => {
  const onChangeRef = useRefFrom(onChange);

  const handleChange = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => onChangeRef.current?.(value || ''),
    [onChangeRef]
  );

  const highlighter = (word: string) => /^n|n$/iu.test(word);

  return (
    <div className={cx('modern-text-area', ROOT_STYLE)}>
      <div className="modern-text-area__doppelganger">
        {value.split('\n').map(line => (
          <Fragment>
            <span>
              {line.split(' ').map(word => (
                <Fragment>
                  <span
                    className={cx('modern-text-area__word', {
                      'modern-text-area__word--highlight': highlighter(word)
                    })}
                  >
                    {word}
                  </span>{' '}
                </Fragment>
              ))}
            </span>
            <br />
          </Fragment>
        ))}
      </div>
      <textarea
        autoFocus={true}
        className="modern-text-area__text-area"
        onChange={handleChange}
        spellCheck={false}
        value={value || ''}
      />
    </div>
  );
};

export default TextArea;
