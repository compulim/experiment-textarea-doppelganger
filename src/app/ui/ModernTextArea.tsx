import { css, cx } from '@emotion/css';
import { FormEventHandler, Fragment, KeyboardEventHandler, useCallback, useMemo, useState } from 'react';
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
    '--hover-color': 'orange',
    '--token-border-color': 'blue'
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

  '& .modern-text-area__popup': {
    backgroundColor: 'palegoldenrod',
    border: 'solid 1px gray',
    borderRadius: 4,
    left: 0,
    padding: '.2em',
    position: 'absolute',
    bottom: 'calc(2em - 10px)',
    width: 100,
    zIndex: 1
  },

  '& .modern-text-area__word': {
    position: 'relative'
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
  },

  '& .modern-text-area__word--hover': {
    backgroundColor: 'var(--hover-color)',
    borderRadius: 4,
    outlineColor: 'var(--hover-color)',
    outlineStyle: 'dotted',
    outlineWidth: '2px'
  }
});

const highlighter = (word: string) => /^n|n$/iu.test(word);

const TextArea = ({ onChange, value }: Props) => {
  const [cursorPosition, setCursorPosition] = useState(-1);
  const onChangeRef = useRefFrom(onChange);

  const handleChange = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => onChangeRef.current?.(value || ''),
    [onChangeRef]
  );

  const handleSelect = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { selectionEnd } }) => setCursorPosition(selectionEnd),
    [setCursorPosition]
  );

  const wordAndPosition = useMemo(() => {
    const wordAndPosition: [string, number][] = [];
    let lastPosition = 0;
    let lastWord = '';

    value.split('').forEach(letter => {
      if (letter === '\n' || letter === ' ') {
        wordAndPosition.push([lastWord, lastPosition]);

        lastPosition += lastWord.length + 1;
        lastWord = '';

        wordAndPosition.push([letter, lastPosition]);
      } else {
        lastWord += letter;
      }
    });

    lastWord && wordAndPosition.push([lastWord, lastPosition]);

    return wordAndPosition;
  }, [value]);

  return (
    <div className={cx('modern-text-area', ROOT_STYLE)}>
      <div className="modern-text-area__doppelganger">
        {wordAndPosition.map(([word, position], index) =>
          word === '\n' ? (
            <br key={index} />
          ) : word !== ' ' ? (
            <Fragment key={index}>
              <span
                className={cx('modern-text-area__word', {
                  'modern-text-area__word--highlight': highlighter(word),
                  'modern-text-area__word--hover':
                    cursorPosition >= position && cursorPosition <= position + word.length
                })}
              >
                {word}
                {highlighter(word) && cursorPosition >= position && cursorPosition <= position + word.length && (
                  <div className={cx('modern-text-area__popup')}>Hello, {word}!</div>
                )}
              </span>
            </Fragment>
          ) : (
            word
          )
        )}
      </div>
      <textarea
        autoFocus={true}
        className="modern-text-area__text-area"
        onChange={handleChange}
        onSelect={handleSelect}
        spellCheck={false}
        value={value || ''}
      />
    </div>
  );
};

export default TextArea;
