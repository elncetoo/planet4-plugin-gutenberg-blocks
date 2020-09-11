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
    const MAX_ROWS = 5;
    
	/**
	 * Accordion constructor.
	 */
    public function __construct(){
        register_block_type(
            'planet4-blocks-beta/accordion',
            [
                'editor_script'     => 'planet4-blocks-beta',
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
                    'accordion_rows'         => [
                            'type'    => 'array',
                            'default' =>  [],
                            'items'   => [
                                'type'       => 'object',
                                // In JSON Schema you can specify object properties in the properties attribute.
                                'properties' => [
                                    'accordion_headline'      => [
                                        'type'    => 'string',
                                        'default' => '',
                                    ],
                                    'accordion_text'          => [
                                        'type'    => 'string',
                                        'default' => '',
                                    ],
                                ],
                            ],
                        ],

                    // 'headline_id'      => [
                    //     'type'    => 'integer',
                    //     'default' =>  1,
                    // ],
                    // 'accordion_style'         => [
                    //     'type'    => 'string',
                    //     'default' => '',
                    // ],
                ],
            ]
        );
    }

    /**
	 * Required by the `Base_Block` class.
	 *
	 * @param array $fields Unused, required by the abstract function.
     * 
     * @return array The data to be passed in the View.
	 */
	public function prepare_data( $attributes ): array {
        $fields = [
			'accordion_title'       => $attributes['accordion_title'] ?? '',
            'accordion_description' => $attributes['accordion_description'] ?? '',
            'accordion_headline'    => $attributes['accordion_headline'] ?? '',
			'accordion_text'        => $attributes['accordion_text'] ?? '',

		];

        // Only show columns that have a title or a description.
		$accordion_rows = array_filter(
			$attributes['accordion_rows'],
			static function ( array $accordion_row ) {
				return ! empty( $accordion_row['accordion_headline'] ) || ! empty( $accordion_row['accordion_text'] );
			}
		);

        $accordion_rows = array_slice( $accordion_rows, 0, self::MAX_ROWS );

		$number_accordion_rows = count( $accordion_rows );

        $fields['no_of_accordion_rows'] = $number_accordion_rows;

        $fields['accordion_rows'] = $accordion_rows;

        $block_data = [
			'fields'              => $fields,
			'available_languages' => P4GBKS_LANGUAGES,
		];

		return $block_data;
	}

 }