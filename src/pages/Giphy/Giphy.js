import React, { useState, useEffect } from "react";
import { Container, Input, Card, Col, Row } from "reactstrap";

function Giphy() {
  const [gifs, setGifs] = useState([]);
  const [inputGif, setinputGif] = useState(null);
  const [Title, setpageTitle] = useState("Trending Gif");
  const [endpoint, setendpoint] = useState("trending");

  const fetchGif = async () => {
    const url = `https://api.giphy.com/v1/gifs/${endpoint}?api_key=q3FWyDsuZuGA2v8zEox8Vkt9onNIRHqk&q=${inputGif}&limit=20&rating=g`;
    const response = await fetch(url);
    const results = await response.json();

    setGifs(results.data);
  };
  useEffect(() => {
    fetchGif();
    // eslint-disable-next-line
  }, [inputGif]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let key = event.target.value;

      setinputGif(key);
      key = key.charAt(0).toUpperCase() + key.substr(1).toLowerCase();
      setpageTitle(key);
      setendpoint("search");
    }
  };

  return (
    <Container className="md-3">
      <h1 className="text-center">{Title}</h1>
      <Row className="mb-4 mt-4 d-flex justify-content-center">
        <Col className="col-6 ">
          <Input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="search here..."
            onKeyPress={handleKeyPress}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {gifs !== undefined &&
          gifs.map((element) => {
            return (
              <Card
                className="card"
                inverse
                style={{
                  width: "300px",
                  margin: "0.5em",
                  textAlign: "center",
                }}
                key={element.id}
              >
                <div className="card-header text-dark font-weight-bold">
                  {element.title}
                </div>
                <img
                  style={{ margin: "1em" }}
                  src={element.images.fixed_height.url}
                  alt="gif"
                />
              </Card>
            );
          })}
      </Row>
    </Container>
  );
}

export default Giphy;
