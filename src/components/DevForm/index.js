import React, { useState, useEffect } from "react";
import "./styles.css";

export default function DevForm({ onSubmit }) {
  const [position, setPosition] = useState({
    latitude: "",
    longitude: ""
  });
  const [form, setForm] = useState({
    github_username: "",
    techs: ""
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setPosition(state => ({ ...state, latitude, longitude }));
      },
      err => {
        console.log(err);
      },
      { timeout: 30000 }
    );
  }, []);

  function handleAddDev(e) {
    e.preventDefault();
    const { github_username, techs } = form;
    const { latitude, longitude } = position;
    onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });
    setForm({ github_username: "", techs: "" });
  }
  return (
    <form>
      <div className="input-block">
        <label htmlFor="">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={form.github_username}
          onChange={e => {
            e.persist();
            setForm(state => ({
              ...state,
              github_username: e.target.value
            }));
          }}
        />
      </div>

      <div className="input-block">
        <label htmlFor="">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={form.techs}
          onChange={e => {
            e.persist();
            setForm(state => ({
              ...state,
              techs: e.target.value
            }));
          }}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            id="latitude"
            required
            type="number"
            value={position.latitude}
            onChange={e => {
              e.persist();
              setPosition(state => ({
                ...state,
                latitude: e.target.value
              }));
            }}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            id="longitude"
            required
            type="number"
            onChange={e => {
              e.persist();
              setPosition(state => ({
                ...state,
                longitude: e.target.value
              }));
            }}
            value={position.longitude}
          />
        </div>
      </div>

      <button type="submit" onClick={handleAddDev}>
        Salvar
      </button>
    </form>
  );
}
