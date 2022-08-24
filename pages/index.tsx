import React, { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import styled from "styled-components";

const Top = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const members: string[] = [
    "都築崇",
    "一場滉平",
    "神和昇",
    "増渕裕介",
    "山田太郎",
    "薗部美奈",
    "宮島梨乃",
    "寺田誠也",
    "佐藤啓道",
    "操上明日香",
    "田代龍星",
  ];
  /**
   * 選択されているmember
   */
  const [selectMember, setSelectMember] = useState<string>(null);
  /**
   * 旧カードの貸し借りフラグ
   */
  const [oldCard, setOldCard] = useState<boolean>(false);
  /**
   * 太郎カードの貸し借りフラグ
   */
  const [tarouCard, tarouOldCard] = useState<boolean>(false);
  /**
   * log
   */
  const [logs, setLogs] = useState<string[]>([]);
  /**
   * memberの選択
   */
  const selectedMember = (member: string) => setSelectMember(member);
  /**
   * 現在の日付を取得
   */
  const now = new Date();
  const getTime = () => {
    const Year = now.getFullYear();
    const Month = now.getMonth() + 1;
    const Date = now.getDate();
    const Hour = now.getHours();
    const Min = now.getMinutes();
    const Sec = now.getSeconds();
    return (
      Year + "年" + Month + "月" + Date + "日" + Hour + ":" + Min + ":" + Sec
    );
  };
  /**
   * カードの貸し借り関数
   */
  const oldCardBorrow = () => {
    setLogs((prev) => [
      `${getTime()}秒に${selectMember}が旧カードを借りる`,
      ...prev,
    ]);
    setOldCard(true);
    setSelectMember(null);
  };
  /**
   * カードの貸し借り関数
   */
  const oldCardReturn = () => {
    setLogs((prev) => [
      `${getTime()}秒に${selectMember}が旧カードを返却`,
      ...prev,
    ]);
    setOldCard(false);
    setSelectMember(null);
  };
  /**
   * カードの貸し借り関数
   */
  const tarouCardBorrow = () => {
    setLogs((prev) => [
      `${getTime()}秒に${selectMember}が太郎カードを借りる`,
      ...prev,
    ]);
    tarouOldCard(true);
    setSelectMember(null);
  };
  /**
   * カードの貸し借り関数
   */
  const tarouCardReturn = () => {
    setLogs((prev) => [
      `${getTime()}秒に${selectMember}が太郎カードを返却`,
      ...prev,
    ]);
    tarouOldCard(false);
    setSelectMember(null);
  };

  return (
    <Main>
      <Header>鍵はしっかり返しましょう</Header>
      <div id="body">
        <Rule>
          <TitleRule>ルール</TitleRule>
          <ul>
            <RuleLi>
              1.自分の名前をクリックして選択している人に名前が出ていることを確認
            </RuleLi>
            <RuleLi>2.対象カードの借りるor返却ボタンをクリック</RuleLi>
            <RuleLi>3.3階でタバコを吸いましょう🚬</RuleLi>
          </ul>
        </Rule>
        {members.map((member) => {
          return (
            <MemberButton key={member} onClick={() => selectedMember(member)}>
              {member}
            </MemberButton>
          );
        })}
        <SelectedMember>
          <TitleMember>選択している人</TitleMember>
          <SelectedName>{selectMember}</SelectedName>
        </SelectedMember>
        <CardArea>
          <OldCardArea>
            <TitleOldCard>旧カード</TitleOldCard>
            <div>
              <OldCardBorrowButton
                disabled={selectMember === null || oldCard === true}
                onClick={oldCardBorrow}
              >
                借りる
              </OldCardBorrowButton>
              <OldCardReturnButton
                disabled={selectMember === null || oldCard === false}
                onClick={oldCardReturn}
              >
                返却
              </OldCardReturnButton>
            </div>
          </OldCardArea>
          <TarouCardArea>
            <TitleTarouCard>太郎カード</TitleTarouCard>
            <div>
              <TarouCardBorrowButton
                disabled={selectMember === null || tarouCard === true}
                onClick={tarouCardBorrow}
              >
                借りる
              </TarouCardBorrowButton>
              <TarouCardReturnButton
                disabled={selectMember === null || tarouCard === false}
                onClick={tarouCardReturn}
              >
                返却
              </TarouCardReturnButton>
            </div>
          </TarouCardArea>
        </CardArea>
      </div>
      <LogArea>
        <TitleLog>貸し出しログ</TitleLog>
        <Log>
          {logs.map((log) => {
            return <p key={log}>{log}</p>;
          })}
        </Log>
      </LogArea>
      <footer>2022 alchemy.inc</footer>
    </Main>
  );
};

export default Top;

// getServerSideProps→getInitialPropsをサーバサイドだけで実行するようにしたもの
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
const Main = styled.div`
  padding: 20px;
`;
const Header = styled.header`
  text-align: center;
  color: red;
`;
// ルール
const Rule = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const TitleRule = styled.p`
  font-size: 18px;
  font-weight: bold;
`;
const RuleUL = styled.div``;
const RuleLi = styled.div``;
// メンバー
const MemberButton = styled.button`
  width: 200px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
`;
const SelectedMember = styled.div`
  height: 50px;
  margin-bottom: 10px;
`;
const TitleMember = styled.p`
  font-size: 18px;
  font-weight: bold;
`;
const SelectedName = styled.div`
  color: red;
`;
// カード
const CardArea = styled.div`
  display: flex;
`;
//　旧カード
const OldCardArea = styled.div`
  width: 100%;
`;
const TitleOldCard = styled.p`
  font-size: 18px;
  font-weight: bold;
`;
const OldCardBorrowButton = styled.button`
  width: 200px;
  height: 50px;
  margin-right: 10px;
`;
const OldCardReturnButton = styled.button`
  width: 200px;
  height: 50px;
`;
//　太郎カード
const TarouCardArea = styled.div`
  width: 100%;
`;
const TitleTarouCard = styled.p`
  font-size: 18px;
  font-weight: bold;
`;
const TarouCardBorrowButton = styled.button`
  width: 200px;
  height: 50px;
  margin-right: 10px;
`;
const TarouCardReturnButton = styled.button`
  width: 200px;
  height: 50px;
`;

//ログ
const LogArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const TitleLog = styled.p`
  font-size: 18px;
  font-weight: bold;
`;
const Log = styled.div`
  height: 300px;
  overflow: scroll;
  border: solid black 1px;
  background-color: #f5f5f5;
  padding-left: 20px;
  padding-right: 10px;
`;
