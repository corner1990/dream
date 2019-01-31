import render from 'react-test-renderer';
import Link from './header'
import React from 'react'
/* 


describe('Layout: BasicLayout', () => {
	it('Render correctly', () => {
		const wrapper = renderer.create(<BasicLayout />);
		expect(wrapper.root.children.length).toBe(1);
		const outerLayer = wrapper.root.children[0];
		// expect(outerLayer.type).toBe('div');
		const title = outerLayer.children[0];
		expect(title.type).toBe('h1');
		expect(title.children[0]).toBe('Yay! Welcome to umi!');
	});
});

*/

describe('header-test', () => {
    it('Render', () => {
        const testRenderer = render.create(
            <Link page="https://www.facebook.com/">Facebook</Link>
            );
            
        console.log(testRenderer.toJSON());
        /* 
        { type: 'a',
        props: { href: 'https://www.facebook.com/' },
        children: [ 'Facebook' ] }
        */
        console.log(testRenderer.toTree());
        /* 
        { nodeType: 'component',
        type: [Function: Link],
        props: { page: 'https://www.facebook.com/', children: 'Facebook' },
        instance: null,
        rendered:
         { nodeType: 'host',
           type: 'a',
           props: { href: 'https://www.facebook.com/', children: 'Facebook' },
           instance: null,
           rendered: [ 'Facebook' ] } }
        */
        // expect()
        // let children = header.children[0]
        
    })
})