import React, { Component } from "react"
import "./Calculator.css"
import Display from "./Display"
import Button from "./Button"

export default class Calculator extends Component {
    state = { value: "", style: { fontSize: 40 + "px" } }
    appendValue(e) {
        // if (this.state.value.length === 16) this.setState({style: {fontSize: 30 + "px"}})
        // else if (this.state.value.length === 21) return
        // else if (this.state.value.length < 16) this.setState({style: {fontSize: 40 + "px"}})
        this.setState({ value: this.state.value + e.target.innerText })
    }
    eraseAll() {
        this.setState({ value: "" })
    }

    squared() {
        const screenNumber = parseFloat(this.state.value)
        if (!screenNumber) return
        const newNumber = (screenNumber ** 2).toString()
        this.setState({ value: newNumber })
    }
    squareRoot() {
        const screenNumber = parseFloat(this.state.value)
        if (!screenNumber) return
        else if (screenNumber < 0) {
            alert("Expressão inválida")
            return
        }
        const newNumber = Math.sqrt(screenNumber).toString()
        this.setState({ value: newNumber })

    }

    inverse() {
        const screenNumber = parseFloat(this.state.value)
        if (!screenNumber) return
        const newNumber = (1 / screenNumber).toString()
        this.setState({ value: newNumber })
    }
    eraseLast() {
        this.setState({ value: this.state.value.substr(0, this.state.value.length - 1) })

    }
    evaluate() {
        try {
            const result = eval(this.state.value)
            if (isNaN(result)) {
                alert("Expressão inválida")
                return
            }
            this.setState(state => ({ value: result.toString() }))
        }
        catch (error) {
            if (error.name === 'SyntaxError')
                alert("Expressão inválida")

        }
    }


    render() {
        return (
            <div className="calculator" >
                <Display value={this.state.value} style={this.state.style} />
                <div className="btns">
                    <Button value="" />
                    <Button value="" />
                    <Button value="C" onClick={e => this.eraseAll()} />
                    <Button value="<=" onClick={e => this.eraseLast()} />
                    <Button value="1/x" onClick={e => this.inverse()} />
                    <Button value="x²" onClick={e => this.squared()} />
                    <Button value="√x" onClick={e => this.squareRoot()} />
                    <Button value="/" onClick={e => this.appendValue(e)} />
                    <Button value="7" onClick={e => this.appendValue(e)} />
                    <Button value="8" onClick={e => this.appendValue(e)} />
                    <Button value="9" onClick={e => this.appendValue(e)} />
                    <Button value="*" onClick={e => this.appendValue(e)} />
                    <Button value="4" onClick={e => this.appendValue(e)} />
                    <Button value="5" onClick={e => this.appendValue(e)} />
                    <Button value="6" onClick={e => this.appendValue(e)} />
                    <Button value="-" onClick={e => this.appendValue(e)} />
                    <Button value="1" onClick={e => this.appendValue(e)} />
                    <Button value="2" onClick={e => this.appendValue(e)} />
                    <Button value="3" onClick={e => this.appendValue(e)} />
                    <Button value="+" onClick={e => this.appendValue(e)} />
                    <Button value="" />
                    <Button value="0" onClick={e => this.appendValue(e)} />
                    <Button value="." onClick={e => this.appendValue(e)} />
                    <Button value="=" onClick={e => this.evaluate()} style={{ backgroundColor: "orange" }} />
                </div>
            </div>
        )
    }
}