//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow, mount } from 'enzyme';

describe('Test', () => {
	it('has 3 items', () => {
		const wrapper = shallow(
			<ul>
				<li>item 1</li>
				<li>item 2</li>
			</ul>
		);
		expect(wrapper.find('li')).toHaveLength(2);
	});

	it('find form h1 className', () => {
		const wrapper = shallow(
			<div>
				<form>
					<h1 className="header">h1</h1>
				</form>
			</div>
		);
		expect(wrapper.find('h1').hasClass('header')).toEqual(true);
	});

	it('find form className', () => {
		const wrapper = shallow(
			<div>
				<form className="guessForm">
					<h1>h1</h1>
				</form>
			</div>
		);
		expect(wrapper.find('form').hasClass('guessForm')).toEqual(true);
	});

	it('find h1 className', () => {
		const wrapper = shallow(
			<div>
				<h1 className="header">h1</h1>
			</div>
		);
		expect(wrapper.find('h1').hasClass('header')).toEqual(true);
	});

	it('find p className', () => {
		const wrapper = shallow(
			<p className="status">
				Guess #<span>56</span>!
			</p>
		);
		expect(wrapper.hasClass('status')).toEqual(true);
	});

	it('find a button', () => {
		const callback = jest.fn();
		const wrapper = shallow(
			<form className="guessForm" onSubmit={e => e.preventDefault()}>
				<input
					type="text"
					name="userGuess"
					id="userGuess"
					className="text"
					maxLength="3"
					autoComplete="off"
					placeholder="Enter your Guess"
					ref={input => {
						this.guessInput = input;
					}}
					autoFocus
				/>
				<button onClick={callback}>Guess</button>
			</form>
		);
		expect(wrapper.find('button').text()).toEqual('Guess');
	});

	it('Check a button', () => {
		const callback = jest.fn();
		const wrapper = mount(
			<form className="guessForm" onSubmit={e => e.preventDefault()}>
				<input
					type="text"
					name="userGuess"
					id="userGuess"
					className="text"
					maxLength="3"
					autoComplete="off"
					placeholder="Enter your Guess"
				/>
				<button onClick={callback}>Guess</button>
			</form>
		);
		expect(wrapper.find('button').text()).toEqual('Guess');
		expect(callback).not.toHaveBeenCalled();
	});

	it('Press a button', () => {
		const callback = jest.fn();
		const wrapper = mount(
			<form className="guessForm" onSubmit={e => e.preventDefault()}>
				<input
					type="text"
					name="userGuess"
					id="userGuess"
					className="text"
					maxLength="3"
					autoComplete="off"
					placeholder="Enter your Guess"
				/>
				<button onClick={callback}>Guess</button>
			</form>
		);
		wrapper.find('button').simulate('click');
		expect(callback).toHaveBeenCalled();
	});
});
