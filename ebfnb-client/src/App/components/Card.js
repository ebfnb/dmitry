/** @jsx jsx */
import { jsx, css } from "@emotion/core"

// Card container
//-------------------------
const containerCss = css`
  background: #fff;
  border-radius: 5px;
  box-shadow: hsla(0, 0, 0, 0.2) 0 4px 2px -2px;
  font-family: "adelle-sans", sans-serif;
  font-weight: 100;
  margin: 48px auto;
  width: 20rem;
  @media screen and (min-width: 480px) {
    width: 28rem;
  }
  @media screen and (min-width: 767px) {
    width: 40rem;
  }
  @media screen and (min-width: 959px) {
    width: 50rem;
  }
  a {
    color: #4d4dff;
    text-decoration: none;
    transition: 0.25s ease;
    &:hover {
      border-color: #ff4d4d;
      color: #ff4d4d;
    }
  }
`
// Card header
//-------------------------
const authorCss = css`
  margin: 0 auto;
  padding-top: 0.125rem;
  width: 80%;
  h3::before {
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/russ.jpeg");
    background-size: cover;
    border-radius: 50%;
    content: " ";
    display: inline-block;
    height: 32px;
    margin-right: 0.5rem;
    position: relative;
    top: 8px;
    width: 32px;
  }
  h3 {
    color: lighten(#333, 40%);
    font-weight: 100;
  }
`

// Card body
//-------------------------
const bodyCss = css`
  margin: 0 auto;
  width: 80%;
`
const titleCss = css`
  h1 a {
    color: #333;
    font-weight: 100;
  }
`
const summaryCss = css`
  p {
    color: lighten(#333, 10%);
  }
`
const tagsCss = css`
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    padding-left: 0;
  }
  li + li {
    margin-left: 0.5rem;
  }
  a {
    border: 1px solid lighten(#333, 40%);
    border-radius: 3px;
    color: lighten(#333, 40%);
    font-size: 0.75rem;
    height: 1.5rem;
    line-height: 1.5rem;
    letter-spacing: 1px;
    padding: 0 0.5rem;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    width: 5rem;
  }
`

// Card footer
//-------------------------
const footerCss = css`
  border-top: 1px solid lighten(#333, 70%);
  margin: 0 auto;
  padding-bottom: 0.125rem;
  width: 80%;
  ul {
    list-style: none;
    display: flex;
    flex: row wrap;
    justify-content: flex-end;
    padding-left: 0;
  }
  li:first-child {
    margin-right: auto;
  }
  li + li {
    margin-left: 0.5rem;
  }
  li {
    color: lighten(#333, 40%);
    font-size: 0.75rem;
    height: 1.5rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    position: relative;
    white-space: nowrap;
    & a {
      color: lighten(#333, 40%);
    }
  }
`
const commentsCss = css`
  margin-right: 1rem;
`
const publishedDateCss = css`
  border: 1px solid lighten(#333, 40%);
  border-radius: 3px;
  padding: 0 0.5rem;
`
const numeroCss = css`
  position: relative;
  top: -0.5rem;
`

// Icons
//-------------------------
const iconCss = css`
  fill: lighten(#333, 40%);
  height: 24px;
  margin-right: 0.5rem;
  transition: 0.25s ease;
  width: 24px;
  &:hover {
    fill: #ff4d4d;
  }
`

const Card = () => {
  return (
    <div css={containerCss}>
      <div>
        <div css={authorCss}>
          <h3>Russ Beye</h3>
        </div>
      </div>

      <div css={bodyCss}>
        <div css={titleCss}>
          <h1>
            <a href="#">This Post Has No Cover Image</a>
          </h1>
        </div>
        <div css={summaryCss}>
          <p>
            Here is an example of a post without a cover image. You don't always
            have to have a cover image. In fact, leaving them out from time to
            time and disrupt the predictive flow and make the overall design
            more interesting. Something to think about.
          </p>
        </div>
        <div css={tagsCss}>
          <ul>
            <li>
              <a href="#">design</a>
            </li>
            <li>
              <a href="#">web dev</a>
            </li>
            <li>
              <a href="#">css</a>
            </li>
          </ul>
        </div>
      </div>

      <div css={footerCss}>
        <ul>
          <li css={publishedDateCss}>12 days ago</li>
          <li css={commentsCss}>
            <a href="#">
              <span css={numeroCss}>8</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Card
