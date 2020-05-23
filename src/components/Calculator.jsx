import React, { Component } from "react"
import "./Calculator.css"
import Display from "./Display"
import Button from "./Button"

export default class Calculator extends Component {
    state = { value: "", style: { fontSize: 40 + "px" } }
    handleKeyPress = this.handleKeyPress.bind(this)
    appendValue = this.appendValue.bind(this)
    eraseAll = this.eraseAll.bind(this)
    eraseLast = this.eraseLast.bind(this)
    evaluate = this.evaluate.bind(this)

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress)
    }

    appendValue(e) {
        e.preventDefault()
        const char = e.target.innerText
        this.setState(state => ({ value: state.value === "Expr. inválida" ? char : state.value + char }))
    }
    eraseAll() {
        this.setState({ value: "" })
    }

    eraseLast() {
        this.setState(state => ({ value: state.value.substr(0, state.value.length - 1) }))
    }

    evaluate(expression, exponent = 1) {
        try {
            if (expression.includes("/0") && exponent === -1) return "0"
            else if (expression.includes("/0")) return "Expr. inválida"
            const result = eval(expression)
            const finalResult = Math.pow(result, exponent)
            if (isNaN(finalResult)) return "Expr. inválida"
            return finalResult.toString().length > 15 ? finalResult.toPrecision(15).toString() : finalResult.toString()
        }
        catch (error) {
            if (error.name === 'SyntaxError' || error.name === 'ReferenceError')
                return "Expr. inválida"
        }

    }
    handleKeyPress(e) {
        e.preventDefault()
        const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "-", "+", ".", "*", "/"]
        const key = e.key
        if (allowedKeys.includes(key))
            this.setState(state => ({ value: state.value === "Expr. inválida" ? key : state.value + key }))
        else if (key === "Enter")
            this.setState(state => ({ value: this.evaluate(state.value) }))
        else if (key === "Backspace")
            this.eraseLast()
    }

    render() {
        return (
            <div className="calculator" >
                <Display value={this.state.value} style={this.state.style} />
                <div className="btns">
                    <Button value="" />
                    <Button value="" />
                    <Button value="C" onClick={this.eraseAll} />
                    <Button value="<=" onClick={this.eraseLast} />
                    <Button value="1/x" onClick={e => this.setState(state =>
                        ({ value: this.evaluate(state.value, -1) }))} />
                    <Button value="x²" onClick={e => this.setState(state =>
                        ({ value: this.evaluate(state.value, 2) }))} />
                    <Button value="√x" onClick={e => this.setState(state =>
                        ({ value: this.evaluate(state.value, 1 / 2) }))} />
                    <Button value="/" onClick={this.appendValue} />
                    <Button value="7" onClick={this.appendValue} />
                    <Button value="8" onClick={this.appendValue} />
                    <Button value="9" onClick={this.appendValue} />
                    <Button value="*" onClick={this.appendValue} />
                    <Button value="4" onClick={this.appendValue} />
                    <Button value="5" onClick={this.appendValue} />
                    <Button value="6" onClick={this.appendValue} />
                    <Button value="-" onClick={this.appendValue} />
                    <Button value="1" onClick={this.appendValue} />
                    <Button value="2" onClick={this.appendValue} />
                    <Button value="3" onClick={this.appendValue} />
                    <Button value="+" onClick={this.appendValue} />
                    <Button value="" />
                    <Button value="0" onClick={this.appendValue} />
                    <Button value="." onClick={this.appendValue} />
                    <Button value="=" onClick={e => this.setState(state =>
                        ({ value: this.evaluate(state.value) }))}
                        style={{ backgroundColor: "orange" }} />
                </div>
            </div>
        )
    }
}