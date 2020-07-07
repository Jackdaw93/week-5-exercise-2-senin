import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DivContainerOne = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid black;
`;

const CardList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Card = styled.div`
  padding: 10px;
  width: 200px;
  & img {
    width: 100%;
  }
`;

export default function Github() {
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);

  function handleChange(event) {
    setSearch(event.target.value);
  }
  //   console.log(username);

  async function handleSubmit(event) {
    event.preventDefault();
  }
  const fetchData = async () => {
    const url =
      "https://api.giphy.com/v1/gifs/trending?api_key=lKKQitcUCTnMwFVa12ti0ab1CTDRRBBk&limit=10&rating=g";
    const response = await fetch(url);
    const result = await response.json();

    const results = result.data;

    setDatas(results);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <DivContainerOne>
        <form onSubmit={handleSubmit}>
          <Input
            id="search"
            name="search"
            placeholder="Search here .."
            value={search}
            onChange={handleChange}
          />
        </form>
      </DivContainerOne>
      <CardList>
        {datas.map((item) => {
          return (
            <Card key={item.id}>
              <img src={item.images.original.url} alt="avatar" />
            </Card>
          );
        })}
      </CardList>
    </div>
  );
}
