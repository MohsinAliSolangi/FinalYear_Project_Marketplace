import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Loader from "../share/Loader";
import PicCard from "./PicCard";

const TodayPicks = ({ loding, setloding, Items }) => {

  return (
    <>
      {loding ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="tf-section sc-explore-1">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="wrap-box explore-1 flex mg-bt-40">
                    <div className="seclect-box style-1">
                      <div id="item_category" className="dropdown">
                        <Link className="btn-selector nolink">
                          All categories
                        </Link>
                        <ul>
                          <li>
                            <span>Art</span>
                          </li>
                          <li className="active">
                            <span>Music</span>
                          </li>
                          <li>
                            <span>Domain Names</span>
                          </li>
                          <li>
                            <span>Virtual World</span>
                          </li>
                          <li>
                            <span>Trading Cards</span>
                          </li>
                          <li>
                            <span>Sports</span>
                          </li>
                          <li>
                            <span>Utility</span>
                          </li>
                        </ul>
                      </div>
                      <div id="buy" className="dropdown">
                        <Link className="btn-selector nolink">Buy Now</Link>
                        <ul>
                          <li>
                            <span>On Auction</span>
                          </li>
                          <li>
                            <span>Has Offers</span>
                          </li>
                        </ul>
                      </div>
                      <div id="all-items" className="dropdown">
                        <Link className="btn-selector nolink">All Items</Link>
                        <ul>
                          <li>
                            <span>Single Items</span>
                          </li>
                          <li>
                            <span>Bundles</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="seclect-box style-2 box-right">
                      <div id="artworks" className="dropdown">
                        <Link className="btn-selector nolink">
                          All Artworks
                        </Link>
                        <ul>
                          <li>
                            <span>Abstraction</span>
                          </li>
                          <li>
                            <span>Skecthify</span>
                          </li>
                          <li>
                            <span>Patternlicious</span>
                          </li>
                          <li>
                            <span>Virtuland</span>
                          </li>
                          <li>
                            <span>Papercut</span>
                          </li>
                        </ul>
                      </div>
                      <div id="sort-by" className="dropdown">
                        <Link className="btn-selector nolink">Sort by</Link>
                        <ul>
                          <li>
                            <span>Top rate</span>
                          </li>
                          <li>
                            <span>Mid rate</span>
                          </li>
                          <li>
                            <span>Low rate</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                    {Items?.map((item, index) => (
                  <PicCard
                    loding={loding}
                    setloding={setloding}
                    item={item}
                    index={index}
                  />
                ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </>
  );
};
//TodayPicks.propTypes = {
//data: PropTypes.array.isRequired,
// };

export default TodayPicks;
