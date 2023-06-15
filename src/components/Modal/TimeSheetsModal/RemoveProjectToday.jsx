import React from "react";

import CalendarImage from "../../../assets/icon_calendar.svg";
import ClockImage from "../../../assets/icon_time.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getContractsByDate } from "../../../redux/slices/timesheet/timesheetActions";
import Select from "../../Select/Select";

const Styles = styled.div`
  width: 100%;
  padding: 10px;
  /* страница Zeiterfassung */
  /* add project TODAY */
  .edit_project_today {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;

    .inputs {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .vertrag {
        display: flex;
        flex-direction: column;
        justify-content: start;

        label {
          font-weight: 500;
          font-size: 15px;
          line-height: 21px;
          color: #32363a;
        }
        select {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 10px;

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }

      .project-select {
        display: flex;
        flex-direction: column;
        justify-content: start;
        label {
          font-weight: 500;
          font-size: 15px;
          line-height: 21px;
          color: #32363a;
        }
        select {
          width: 300px;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 10px;

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }
    }
    .textareas {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      width: 100%;

      .first,
      .second {
        width: 100%;
        max-height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: start;

        textarea {
          background: #ffffff;
          padding: 12px;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          font-weight: 400;
          font-size: 14px;
          line-height: 19px;
          color: #4b4e51;

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }
    }
    .time {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 16px;

      .datum,
      .von,
      .bis,
      .pause,
      .zeit {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;

        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        color: #32363a;

        .datum__content,
        .von__content,
        .bis__content,
        .pause__content,
        .zeit__content {
          max-width: fit-content;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          display: flex;
          padding: 8px;
          input {
            border: none;
            outline: none;
            width: 100%;

            &:disabled {
              background-color: #f2f3f4;
            }
          }
        }
      }
    }
  }
  /* *********************************** */
`;

const RemoveProjectToday = (props) => {
  const dispatch = useDispatch();
  const { contractsTimeSheetDropDown } = useSelector(
    (state) => state.timesheet
  );

  console.log(props.remove_project_today);

  const [state, setState] = React.useState({
    // excel_template: props.current_project.excel_template,
    // name: props.current_project.name,
    // description: props.current_project.description,
  });

  React.useEffect(() => {
    dispatch(getContractsByDate(props.remove_project_today._d));
  }, []);

  return (
    <Styles>
      <div className="edit_project_today">
        {/* инпуты */}
        <div className="inputs">
          <div className="vertrag">
            <label className="mb-2">Vertrag</label>
            <select disabled name="" id=""></select>
          </div>
          <div className="project-select">
            <label className="mb-2">.</label>
            <Select
              disabled
              handleSelect={(value) => {
                // setState((state) => ({ ...state, excel_template: value }));
              }}
              titles={[
                { label: "Abrechnung 1:1", key: null },
                { label: "Abrechnung mit 0.00 PT", key: 0 },
                { label: "Abrechnung mit 0.25 PT", key: 0.25 },
                { label: "Abrechnung mit 0.50 PT", key: 0.5 },
                { label: "Abrechnung mit 0.75 PT", key: 0.75 },
                { label: "Abrechnung mit 1.00 PT", key: 1 },
              ]}
              currentTitle={
                props.remove_project_today.contract.man_day_override
              }
            />
          </div>
        </div>
        {/* поля текста textarea */}
        <div className="textareas">
          <div className="first">
            <label className="mb-2">Tätigkeiten</label>
            <textarea disabled name="" id="" cols="30" rows="10">
              {props.remove_project_today.contract.description}
            </textarea>
          </div>
          <div className="second">
            <label className="mb-2">Kommentar</label>
            <textarea disabled name="" id="" cols="30" rows="10">
              {props.remove_project_today.contract.notes}
            </textarea>
          </div>
        </div>
        {/* время внизу */}
        <div className="time">
          <div className="datum">
            <label>Datum</label>
            <div className="datum__content">
              <label htmlFor="date">
                <img src={CalendarImage} alt="calendar icon" />
              </label>
              <input
                disabled
                type="date"
                id="date"
                value={props.remove_project_today._d}
              />
            </div>
          </div>
          <div className="von">
            <label>Von</label>
            <div className="von__content">
              <img src={ClockImage} alt="von icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.contract.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="bis">
            <label>Bis</label>
            <div className="bis__content">
              <img src={ClockImage} alt="bis icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.contract.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="pause">
            <label>Pause</label>
            <div className="pause__content">
              <img src={ClockImage} alt="pause icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.contract.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="zeit">
            <label>Zeit</label>
            <div className="zeit__content">
              <img src={ClockImage} alt="zeit icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.contract.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default RemoveProjectToday;
