<?php
/**
 * Accordion block class.
 *
 * @package P4GBKS
 * @since 0.1
 */


namespace P4GBKS\Blocks;


/**
 * Class Accordion
 *
 * @package P4GBKS\Blocks
 */

 class Accordion extends Base_Block {

    /**
	 * Block name.
	 *
	 * @const string BLOCK_NAME.
	 */
    const BLOCK_NAME = 'accordion';
    
	/**
	 * Accordion constructor.
	 */
    public function __construct(){
        register_block_type(
            'planet4-blocks/accordion',
            [
                'editor_script'     => 'planet4-blocks',
                'render_callback' => [ $this, 'render' ],
                'attributes'        => [
                    'accordion_title'         => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                    'accordion_description'   => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                    'accordion_headline'      => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                    'accordion_text'          => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                    'accordion_icon'          => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                    'accordion_style'         => [
                        'type'    => 'string',
                        'default' => '',
                    ],
                ],
            ]
        );
    }

    /**
	 * Required by the `Base_Block` class.
	 *
	 * @param array $fields Unused, required by the abstract function.
	 */
	public function prepare_data( $fields ): array {
		return [];
	}

 }