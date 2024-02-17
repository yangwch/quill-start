import Quill, { RangeStatic, StringMap } from "quill";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { calcBubblePosition } from "../services/bubble";
export interface BubbleToolState {
  visible: boolean;
  x: number;
  y: number;
}

const useEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const [bubbleState, setBubbleState] = useState<BubbleToolState>({
    visible: false,
    x: 0,
    y: 0,
  });
  useEffect(() => {
    if (ref.current && !editorRef.current) {
      var options = {
        debug: "info",
        modules: {
          toolbar: "#toolbar",
        },
        placeholder: "点击输入...",
        theme: "snow",
        inline: true,
      };
      const editor = new Quill(ref.current, options);

      // 用于标记是否触发了选择项变化事件，方向键处理时需要
      let triggeredChange = false;
      editor.on("selection-change", range => {
        console.warn("selection-change", range);
        triggeredChange = true;
        if (range && range.length > 0 && bubbleRef.current && ref.current) {
          const bounds = editor.getBounds(range.index, range.length);
          console.log("selection bounds", bounds);
          const { left: bubbleLeft, top: bubbleTop } = calcBubblePosition(
            ref.current.getBoundingClientRect(),
            bounds,
            bubbleRef.current.getBoundingClientRect(),
          );
          // 计算弹出工具栏的位置
          setBubbleState({
            visible: true,
            x: bubbleLeft,
            y: bubbleTop,
          });
        } else {
          setBubbleState({ visible: false, x: 0, y: 0 });
        }
      });

      // 重新设置格式
      const resetFormat = (newFormat?: StringMap) => {
        const range = editor.getSelection();
        if (!range) return;
        const formats = editor.getFormat(range.index, 0);
        if (formats) {
          Object.keys(formats).forEach(function (name) {
            // Clean functionality in existing apps only clean inline formats
            editor.format(name, false);
          });
        }
        if (newFormat) {
          Object.keys(newFormat).forEach(function (name) {
            editor.format(name, newFormat[name]);
          });
        }
      };
      editor.keyboard.addBinding({ key: "right" }, function (range, context) {
        console.log("ArrowRight", range, context);
        try {
          if (range.length === 0 && range.index > 0) {
            const formats = editor.getFormat(range);
            if (formats) {
              const nextFormat = editor.getFormat(range.index, 1);
              if (formats.code) {
                if (!nextFormat.code && triggeredChange) {
                  resetFormat(nextFormat);
                  triggeredChange = false;
                  return false;
                }
              } else {
                // 在code代码块的最左侧，取不到格式code:true
                // 所以判断是否选中项有变化，如果选中项变化过，重新设置临界位置的格式
                if (nextFormat.code && triggeredChange) {
                  editor.format("code", true, "user");
                  triggeredChange = false;
                  return false;
                }
              }
            }
          }
        } catch (err) {
          console.warn("arrowRight error", err);
        }
        return true;
      });

      const isCodeFormat = (range: RangeStatic) => {
        const formats = editor.getFormat(range);
        if (formats) {
          return !!formats.code;
        }
        return false;
      };
      editor.keyboard.addBinding({ key: "left" }, function (range, context) {
        console.log("ArrowLeft", range, context);
        try {
          if (range.length === 0) {
            const isCode = isCodeFormat(range);
            if (range.index > 0) {
              if (!isCode) {
                const prevIsCode = isCodeFormat({
                  index: range.index - 1,
                  length: 1,
                });

                if (prevIsCode) {
                  editor.format("code", true);
                  return false;
                }
              }
            }
            // 如果在最左侧，清空格式[暂不处理：重置格式后，输入的第1个字符会出现的光标的右侧]
            // if (range.index === 0 && isCode) {
            //   resetFormat();
            // }
            // 处理从代码块右侧的文字，按ArrowLeft，将光标切换到代码块右侧时，让光标出现在代码块外
            if (range.index > 1) {
              const format = editor.getFormat(range.index - 1, 1);
              if (!format.code) {
                const leftIsCode = isCodeFormat({
                  index: range.index - 2,
                  length: 1,
                });
                // 自己设置选区
                if (leftIsCode) {
                  editor.setSelection({ index: range.index - 1, length: 0 });
                  resetFormat(format);
                  return false;
                }
              }
            }
          }
        } catch (err) {
          console.warn("arrowLeft error", err);
        }
        return true;
      });
      editorRef.current = editor;
      // @ts-ignore
      window.editor = editor;
    }
  }, []);
  const getSelectedText = useCallback(() => {
    if (editorRef.current) {
      const range = editorRef.current.getSelection();
      if (range && range.length > 0) {
        const text = editorRef.current.getText(range.index, range.length);
        return text;
      }
    }
    return "";
  }, []);
  const onImprove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      console.warn("onImprove", getSelectedText());
    },
    [getSelectedText],
  );
  const onContinue = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      console.warn("onContinue", getSelectedText());
    },
    [getSelectedText],
  );
  const onTranslate = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      console.warn("onTranslate", getSelectedText());
    },
    [getSelectedText],
  );
  const onSimplify = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      console.warn("onSimplify", getSelectedText());
    },
    [getSelectedText],
  );

  const onExpand = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      console.warn("onExpand", getSelectedText());
    },
    [getSelectedText],
  );

  const onAppend = useCallback((text: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const contents = editor.getContents();
      if (contents) {
        contents.push({ insert: text });
      }
      editor.setContents(contents);
    }
  }, []);
  return {
    editorRef,
    bubbleRef,
    ref,
    bubbleState,
    getSelectedText,
    onImprove,
    onContinue,
    onTranslate,
    onSimplify,
    onExpand,
    onAppend,
  };
};

export default useEditor;
