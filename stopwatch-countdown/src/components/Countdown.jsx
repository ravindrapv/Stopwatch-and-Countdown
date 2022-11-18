import React, { Component } from "react";

class Countdown extends Component {
    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0
    };

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: this.state.timerTime
        });
        this.timer = setInterval(() => {
            const newTime = this.state.timerTime - 10;
            if (newTime >= 0) {
                this.setState({
                    timerTime: newTime
                });
            } else {
                clearInterval(this.timer);
                this.setState({ timerOn: false });
                alert("Countdown ended");
            }
        }, 10);
    };

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
    };
    resetTimer = () => {
        if (this.state.timerOn === false) {
            this.setState({
                timerTime: this.state.timerStart
            });
        }
    };
    updateTime = (input) => {
        const { timerTime, timerOn } = this.state;
        if (!timerOn) {
            switch (input) {
                case "incHours":
                    return timerTime + 3600000;
                case "decHours":
                    return timerTime - 3600000;
                case "incMinutes":
                    return timerTime + 60000;
                case "decMinutes":
                    return timerTime - 60000;
                case "incSeconds":
                    return timerTime + 1000;
                case "decSeconds":
                    return timerTime - 1000;
                default:
                    return;
            }
        }
    };

    adjustTimer = (input) => {
        const newTime = this.updateTime(input);
        this.setState({ timerTime: newTime });
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        const { timerTime, timerStart, timerOn } = this.state;
        let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

        return (
            <div className="Countdown">
                <span className="cross" onClick={() => this.props.close("countdown")}>
                    X
                </span>
                <div className="Countdown-header">Countdown</div>
                <div className="Countdown-label">Hours : Minutes : Seconds</div>
                <div className="Countdown-display">
                    <button onClick={() => this.adjustTimer("incHours")}>⬆</button>
                    <button onClick={() => this.adjustTimer("incMinutes")}>⬆</button>
                    <button onClick={() => this.adjustTimer("incSeconds")}>⬆</button>

                    <div className="Countdown-time">
                        {hours} : {minutes} : {seconds}
                    </div>

                    <button onClick={() => this.adjustTimer("decHours")}>⬇</button>
                    <button onClick={() => this.adjustTimer("decMinutes")}>⬇</button>
                    <button onClick={() => this.adjustTimer("decSeconds")}>⬇</button>
                </div>

                {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
                    <button className="Button-start" onClick={this.startTimer}>
                        Start
                    </button>
                )}
                {timerOn === true && timerTime >= 1000 && (
                    <button className="Button-stop" onClick={this.stopTimer}>
                        Stop
                    </button>
                )}
                {timerOn === false &&
                    timerStart !== 0 &&
                    timerStart !== timerTime &&
                    timerTime !== 0 && (
                        <button className="Button-start" onClick={this.startTimer}>
                            Resume
                        </button>
                    )}

                {(timerOn === false || timerTime < 1000) &&
                    timerStart !== timerTime &&
                    timerStart > 0 && (
                        <button className="Button-reset" onClick={this.resetTimer}>
                            Reset
                        </button>
                    )}
            </div>
        );
    }
}

export default Countdown;
