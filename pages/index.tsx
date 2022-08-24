import React, { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Top = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const members: string[] = [
    "都築崇",
    "一場滉平",
    "神和昇",
    "増渕裕介",
    "山田太郎",
    "園部美奈",
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
      ...prev,
      `${getTime()}に${selectMember}が旧カードを借りる`,
    ]);
    setOldCard(true);
    setSelectMember(null);
  };
  /**
   * カードの貸し借り関数
   */
  const oldCardReturn = () => {
    setLogs((prev) => [
      ...prev,
      `${getTime()}に${selectMember}が旧カードを返却`,
    ]);
    setOldCard(false);
    setSelectMember(null);
  };
  /**
   * カードの貸し借り関数
   */
  const tarouCardBorrow = () => {
    setLogs((prev) => [
      ...prev,
      `${getTime()}に${selectMember}が太郎カードを借りる`,
    ]);
    tarouOldCard(true);
    setSelectMember(null);
  };
  /**
   * カードの貸し借り関数
   */
  const tarouCardReturn = () => {
    setLogs((prev) => [
      ...prev,
      `${getTime()}に${selectMember}が太郎カードを返却`,
    ]);
    tarouOldCard(false);
    setSelectMember(null);
  };

  return (
    <>
      <header>鍵はしっかり返しましょう</header>
      <div id="body">
        <div>
          <p>ルール</p>
          <ul>
            <li>
              自分の名前をクリックして選択している人に名前が出ていることを確認
            </li>
            <li>対象カードの借りるor返却ボタンをクリック</li>
          </ul>
        </div>
        {members.map((member) => {
          return (
            <button key={member} onClick={() => selectedMember(member)}>
              {member}
            </button>
          );
        })}
        <div>
          <p>選択している人</p>
          <div>{selectMember}</div>
        </div>
        <div>
          <div>
            <p>旧カード</p>
            <div>
              <button
                disabled={selectMember === null || oldCard === true}
                onClick={oldCardBorrow}
              >
                借りる
              </button>
              <button
                disabled={selectMember === null || oldCard === false}
                onClick={oldCardReturn}
              >
                返却
              </button>
            </div>
          </div>
          <div>
            <p>太郎カード</p>
            <div>
              <button
                disabled={selectMember === null || tarouCard === true}
                onClick={tarouCardBorrow}
              >
                借りる
              </button>
              <button
                disabled={selectMember === null || tarouCard === false}
                onClick={tarouCardReturn}
              >
                返却
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>貸し出しログ</p>
        <div>
          {logs.map((log) => {
            return <p key={log}>{log}</p>;
          })}
        </div>
      </div>
      <footer>2022 alchemy.inc</footer>
    </>
  );
};

export default Top;

// getServerSideProps→getInitialPropsをサーバサイドだけで実行するようにしたもの
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
