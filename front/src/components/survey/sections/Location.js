import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../../../modules/address";
import Loading from "../../loading/Loading";

const LocationArea = styled.div`
  height: 10%;
  width: 55%;
  border-bottom: 2px solid black;
`;

function Location() {
  const { loading, data, error } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      dispatch(
        getAddress({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      );
    });
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAddress());
  // }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>에러 ...</div>;
  // if (!data) return null;

  return (
    <>
      <LocationArea>
        {data ? data.documents[0].address.address_name : ""}
      </LocationArea>
    </>
  );
}

export default Location;
