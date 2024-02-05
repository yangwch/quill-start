import { useEffect, useRef } from "react";
import Quill from "quill";
import "@yangwch/y-components/dist/umd/main.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Quill | null>(null);
  useEffect(() => {
    var toolbarOptions = [
      ["bold", "italic", "underline", "strike", "code"], // toggled buttons
      // ["blockquote", "code-block"],

      // [{ header: 1 }, { header: 2 }], // custom button values
      // [{ list: "ordered" }, { list: "bullet" }],
      // [{ script: "sub" }, { script: "super" }], // superscript/subscript
      // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      // [{ direction: "rtl" }], // text direction

      // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],

      // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      // [{ align: [] }],

      ["clean"],
    ];

    if (ref.current && !editorRef.current) {
      // 用于标记是否触发了选择项变化事件，方向键处理时需要
      let triggeredChange = false;
      // 重新设置格式
      const resetFormat = (newFormat?: any) => {
        const editor = editorRef.current;
        if (!editor) return;
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
      const onArrowRight = (range: any, context: any) => {
        const editor = editorRef.current;
        if (!editor) return;
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
      };

      const isCodeFormat = (range: any) => {
        const editor = editorRef.current;
        if (!editor) return;
        const formats = editor.getFormat(range);
        if (formats) {
          return !!formats.code;
        }
        return false;
      };
      const onArrowLeft = (range: any, context: any) => {
        const editor = editorRef.current;
        if (!editor) return;
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
      };
      var options = {
        // debug: "info",
        modules: {
          toolbar: toolbarOptions,
          keyboard: {
            bindings: {
              ArrowLeft: {
                key: "ArrowLeft",
                handler: onArrowLeft,
              },
              ArrowRight: {
                key: "ArrowRight",
                handler: onArrowRight,
              },
            },
          },
        },
        placeholder: "点击输入...",
        theme: "snow",
        inline: true,
      };
      const editor = new Quill(ref.current, options);

      editor.on("selection-change", range => {
        console.warn("selection-change", range);
        triggeredChange = true;
      });
      editorRef.current = editor;
      // @ts-ignore
      window.editor = editor;
    }
  }, []);

  return (
    <div>
      <div id="toolbar"></div>
      <div ref={ref}>
        当前使用了<code>Quill:2.0.0-beta.2</code>，
        <code>Quill</code>
        <s>无法</s>
        支持任意的DOM树和HTML更改。但正如我们将看到的，这种结构提供的一致性和可预测性使我们能够轻松构建丰富的编辑体验。
      </div>
    </div>
  );
}

export default Demo;
