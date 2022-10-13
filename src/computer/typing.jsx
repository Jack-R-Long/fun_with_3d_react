import TypeIt from "typeit-react";

export const Typing = () => {
  return (
    <div className="computer-text">
      <h1>
        <TypeIt
          options={{
            strings: [
              "Hey there I am Jack Attack",
              " ",
              "I love building things, breaking things, and talking $%!@",
              " ",
              "Click the computer and drag it around for fun!",
              " ",
              "Click the bird to go to my Twitter ♥️",
              " ",
              "Click the cat to go to my Github ♥️",
            ],
            speed: 80,
            waitUntilVisible: true,
          }}
        />
      </h1>
    </div>
  );
};
