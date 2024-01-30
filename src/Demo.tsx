import { useCallback, useEffect, useRef, useState } from "react";
import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";
import { Button, Space } from "@yangwch/y-components";
import "@yangwch/y-components/dist/umd/main.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Quill | null>(null);
  const [length, setLength] = useState(0);
  const [range, setRange] = useState<RangeStatic | null>(null);
  const [bounds, setBounds] = useState<any>(null);
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
      var options = {
        debug: "info",
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: "点击输入...",
        theme: "snow",
        inline: true,
      };
      const editor = new Quill(ref.current, options);
      editor.on("text-change", () =>
        setLength(editor.getText().replace(/[\n\r]/g, "").length),
      );
      let triggeredChange = false;
      editor.on("selection-change", range => {
        console.warn("selection-change", range);
        triggeredChange = true;
        setRange(range);
        if (range) {
          setBounds(editor.getBounds(range.index, range.length));
          if (range.length === 0) {
            const leaf = editor.getLine(range.index);
            console.log("leaf", leaf);
            editor.getFormat(range.index, 1);
          }
        }
      });

      const clearFormat = () => {
        const range = editor.getSelection();
        if (!range) return;
        const formats = editor.getFormat(range.index, 0);
        if (formats) {
          // editor.removeFormat(range.index, 0, 'user');
          Object.keys(formats).forEach(function (name) {
            // Clean functionality in existing apps only clean inline formats
            editor.format(name, false);
          });
          // editor.formatText(range.index, 0, formats);
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
                if (!nextFormat.code) {
                  clearFormat();
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
            if (range.index > 0) {
              const isCode = isCodeFormat(range);
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
            // 如果在最左侧，清空格式
            if (range.index === 0) {
              clearFormat();
            }
            // if (range.index > 1) {
            // }
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

  const setContent = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.setContents([
        {
          insert: "Hello Quill!",
          attributes: {
            bold: true,
          },
        },
      ] as any);
    }
  }, []);

  const insertText = useCallback(() => {
    if (editorRef.current) {
      const selection = editorRef.current.getSelection();
      editorRef.current.insertText(selection?.index || 0, "Hello Quill!", {
        bold: true,
        italic: true,
        underline: true,
        strike: true,
        color: "red",
      });
    }
  }, []);
  const updateContents = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.updateContents(
        new Delta()
          .retain(6)
          .delete(5)
          .insert("World")
          .retain(1, { fontSize: "30px", color: "green" }),
      );
    }
  }, []);
  const setColor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.format("color", "red");
    }
  }, []);
  const setAlign = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.format("align", "right");
    }
  }, []);
  const formatText = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.formatText(range?.index || 0, range?.length || 0, {
        color: "red",
        bold: true,
        italic: true,
        underline: true,
        strike: true,
        size: "large",
      });
    }
  }, [range?.index, range?.length]);
  const getFormat = useCallback(() => {
    if (editorRef.current) {
      alert(JSON.stringify(editorRef.current.getFormat()));
    }
  }, []);
  const setSelection = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.setSelection(0, 7);
    }
  }, []);
  return (
    <div>
      <Space wrap>
        <Button
          onClick={() => {
            console.log(editorRef.current?.getContents());
          }}
        >
          Get Contents
        </Button>
        <Button onClick={setContent}>Set Text</Button>
        <Button onClick={insertText}>Insert Text</Button>
        <Button onClick={updateContents}>Update Contents</Button>
        <Button onClick={setColor}>Set Color</Button>
        <Button onClick={setAlign}>Align Right</Button>
        <Button onClick={formatText}>Format Text</Button>
        <Button onClick={getFormat}>Get Format</Button>
        <Button onClick={setSelection}>Set Selection</Button>
      </Space>
      <div id="toolbar"></div>
      <div ref={ref}>
        <code>Quill:</code>由于这些限制，<code>Quill</code>
        无法支持任意的DOM树和HTML更改。但正如我们将看到的，这种结构提供的一致性和可预测性使我们能够轻松构建丰富的编辑体验。
      </div>
      <div>字符数：{length}</div>
      <div>选中项：{JSON.stringify(range)}</div>
      <div>选中范围：{JSON.stringify(bounds)}</div>
    </div>
  );
}

export default Demo;
