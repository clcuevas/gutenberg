/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, Separator, ToggleControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { ENTER } from '@wordpress/keycodes';
import {
	getDefaultBlockName,
	createBlock,
} from '@wordpress/blocks';

export default class MoreEdit extends Component {
	constructor() {
		super( ...arguments );
		this.onChangeInput = this.onChangeInput.bind( this );
		this.onKeyDown = this.onKeyDown.bind( this );

		this.state = {
			defaultText: __( 'Read more' ),
		};
	}

	onChangeInput( event ) {
		// Set defaultText to an empty string, allowing the user to clear/replace the input field's text
		this.setState( {
			defaultText: '',
		} );

		const value = event.target.value.length === 0 ? undefined : event.target.value;
		this.props.setAttributes( { customText: value } );
	}

	onKeyDown( event ) {
		const { keyCode } = event;
		const { insertBlocksAfter } = this.props;
		if ( keyCode === ENTER ) {
			insertBlocksAfter( [ createBlock( getDefaultBlockName() ) ] );
		}
	}

	getHideExcerptHelp( checked ) {
		return checked ?
			__( 'The excerpt is hidden.' ) :
			__( 'The excerpt is visible.' );
	}

	render() {
		const { customText, noTeaser } = this.props.attributes;
		const { setAttributes } = this.props;

		const toggleHideExcerpt = () => setAttributes( { noTeaser: ! noTeaser } );
		const { defaultText } = this.state;
		const value = customText !== undefined ? customText : defaultText;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<ToggleControl
							label={ __( 'Hide the excerpt on the full content page' ) }
							checked={ !! noTeaser }
							onChange={ toggleHideExcerpt }
							help={ this.getHideExcerptHelp }
						/>
					</PanelBody>
				</InspectorControls>
				<Separator
					className="wp-block-more"
					editable={ true }
					customText={ value }
					onChange={ this.onChangeInput }
					onKeyDown={ this.onKeyDown }
				/>
			</Fragment>
		);
	}
}
