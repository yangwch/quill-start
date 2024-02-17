import { Card } from "antd";
import "./App.css";
import Editor from "./components/Editor";
import InternalLayout from "./components/Layout";
import useEditor from "./hooks/useEditor";
import List from "./components/List";
import Header from "./components/Header";
import useAi from "./hooks/useAi";
import InternalDialog from "./components/Dialog";

function App() {
  const {
    ref,
    bubbleState,
    bubbleRef,
    getSelectedText,
    onContinue,
    onExpand,
    onImprove,
    onSimplify,
    onTranslate,
    onAppend,
  } = useEditor();
  const {
    list,
    templateType,
    dialogVisible,
    onShowAdDialog,
    onShowIntroYourselfDialog,
    onHideDialog,
    onSubmit,
  } = useAi();
  return (
    // <div className="App">
    //   <Demo />
    // </div>
    <>
      <InternalLayout
        header={
          <Header
            onShowAdd={() => onShowAdDialog()}
            onShowIntro={() => onShowIntroYourselfDialog()}
            // onShowSocialMedia={() => onShowSocialMedia()}
          />
        }
        content={
          <Card style={{ border: 0, padding: 30 }}>
            <Editor
              wrapperRef={ref}
              bubbleRef={bubbleRef}
              bubbleState={bubbleState}
              onContinue={onContinue}
              onExpand={onExpand}
              onImprove={onImprove}
              onSimplify={onSimplify}
              onTranslate={onTranslate}
            />
          </Card>
        }
        sider={
          <Card style={{ height: "100%", overflow: "auto" }} title="Results">
            <List
              list={list}
              onAdd={(text: string) => {
                console.log("onAdd", text);
                onAppend(text);
              }}
              onFavorite={(id: string) => {
                console.log("onFavorite", id);
              }}
            />
          </Card>
        }
      />
      <InternalDialog
        dialogVisible={dialogVisible}
        onShowAdDialog={onShowAdDialog}
        onShowIntroYourselfDialog={onShowIntroYourselfDialog}
        onHideDialog={onHideDialog}
        onSubmit={onSubmit}
        templateType={templateType}
      ></InternalDialog>
    </>
  );
}

export default App;
