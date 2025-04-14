import { Textarea } from "@chakra-ui/react";

const Todo = () => {
  return(
    <Textarea 
      h="full" 
      borderWidth="2px" 
      borderColor="gray.100" 
      placeholder={`
        ・〇〇〇株式会社 エントリーシート提出（4/20〆切）
        ・△△△株式会社 WEBテスト受験（4/18まで）
        ・面接準備：志望動機＆逆質問の練習
        ・スーツクリーニング出す
        ・説明会加リンク確認`
        .split('\n')
        .map(line => line.trimStart())
        .join('\n')
    }
  />
  );
}

export default Todo;