import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./RedditFooter.scss";
import util from "../../helpers/util";
import { RedditHandler } from "../../services/RedditHandler";

function RedditFooter(props: any) {
  const redditHandler = RedditHandler.getInstance();
  const [saved, setSaved] = React.useState(false);
  const listing = props.listing;

  React.useEffect(() => {
    setSaved(listing.saved);
  }, []);

  function toggleSave() {
    if (saved === true) {
      setSaved(false);
      redditHandler.unsave(listing).catch(() => {
        setSaved(true);
      });
    } else {
      setSaved(true);
      redditHandler.save(listing).catch(() => {
        setSaved(false);
      });
    }
  }

  function renderFooter(numComments: number) {
    let numString = util.normalizeNumber(numComments);
    return (
      <div className="footer">
        <div className="link">
          <button>
            <FontAwesomeIcon icon="comment-alt"></FontAwesomeIcon>
            <span className="link-text">{numString} comments</span>
          </button>
        </div>

        <div className="link">
          <button>
            <FontAwesomeIcon icon="award"></FontAwesomeIcon>
            <span className="link-text">Give award</span>
          </button>
        </div>

        <div className="link">
          <button>
            <FontAwesomeIcon icon="share"></FontAwesomeIcon>
            <span className="link-text">Share</span>
          </button>
        </div>

        <div className="link">
          <button onClick={toggleSave}>
            <FontAwesomeIcon
              icon={saved ? "bookmark" : ["far", "bookmark"]}
            ></FontAwesomeIcon>
            <span className="link-text">{saved ? "Unsave" : "Save"}</span>
          </button>
        </div>
      </div>
    );
  }

  return renderFooter(listing.num_comments);
}

export default RedditFooter;
