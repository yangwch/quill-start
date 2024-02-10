import { Card } from "@yangwch/y-components";
import "./App.css";
import Editor from "./components/Editor";
import InternalLayout from "./components/Layout";
import useEditor from "./hooks/useEditor";
import List from "./components/List";

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
    onAppend
  } = useEditor();
  return (
    // <div className="App">
    //   <Demo />
    // </div>
    <InternalLayout
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
            list={[
              {
                id: "1",
                text: "小糖果是一家本地制造糖果的公司，我们使用全天然原料，无污染，不添加防腐剂。自成立以来，我们致力于提供健康、美味的糖果产品。我们的生产过程严格遵循高品质标准，确保每一颗小糖果都能给消费者带来纯正的口感和愉悦的体验。无论是作为休闲零食还是礼物赠送，小糖果都是您最佳的选择。我们始终关注环境保护和可持续发展，在生产过程中尽可能降低对环境的影响。通过与当地农民和供应商合作，我们确保使用优质的原材料，并为当地经济做出贡献。选择小糖果，您将在享受美味同时也支持健康和可持续发展。",
                favorite: true,
              },
              {
                id: "2",
                text: "我是占位",
                favorite: false,
              },
            ]}
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
  );
}

export default App;
