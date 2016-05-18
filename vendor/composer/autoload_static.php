<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit23363f0bd8aad525c71c35ef52ed992a
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Symfony\\Component\\Process\\' => 26,
            'Seld\\JsonLint\\' => 14,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Symfony\\Component\\Process\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/process',
        ),
        'Seld\\JsonLint\\' => 
        array (
            0 => __DIR__ . '/..' . '/seld/jsonlint/src/Seld/JsonLint',
        ),
    );

    public static $prefixesPsr0 = array (
        'a' => 
        array (
            'aleksip\\DataTransformPlugin\\' => 
            array (
                0 => __DIR__ . '/..' . '/aleksip/plugin-data-transform/src',
            ),
        ),
        'T' => 
        array (
            'Twig_' => 
            array (
                0 => __DIR__ . '/..' . '/twig/twig/lib',
            ),
        ),
        'S' => 
        array (
            'Symfony\\Component\\Yaml\\' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/yaml',
            ),
            'Symfony\\Component\\Finder\\' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/finder',
            ),
            'Symfony\\Component\\Filesystem\\' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/filesystem',
            ),
            'Symfony\\Component\\EventDispatcher\\' => 
            array (
                0 => __DIR__ . '/..' . '/symfony/event-dispatcher',
            ),
        ),
        'P' => 
        array (
            'Pimple' => 
            array (
                0 => __DIR__ . '/..' . '/pimple/pimple/lib',
            ),
            'PatternLab\\PatternEngine\\Twig' => 
            array (
                0 => __DIR__ . '/..' . '/pattern-lab/patternengine-twig/src',
            ),
            'PatternLab\\Composer' => 
            array (
                0 => __DIR__ . '/..' . '/pattern-lab/unified-asset-installer/src',
            ),
            'PatternLab' => 
            array (
                0 => __DIR__ . '/..' . '/pattern-lab/core/src',
            ),
        ),
        'M' => 
        array (
            'Michelf' => 
            array (
                0 => __DIR__ . '/..' . '/michelf/php-markdown',
            ),
        ),
        'G' => 
        array (
            'Guzzle\\Tests' => 
            array (
                0 => __DIR__ . '/..' . '/guzzle/guzzle/tests',
            ),
            'Guzzle' => 
            array (
                0 => __DIR__ . '/..' . '/guzzle/guzzle/src',
            ),
        ),
        'D' => 
        array (
            'Drupal\\Core\\Template\\' => 
            array (
                0 => __DIR__ . '/..' . '/aleksip/plugin-data-transform/src',
            ),
            'Drupal\\Component\\Utility\\' => 
            array (
                0 => __DIR__ . '/..' . '/aleksip/plugin-data-transform/src',
            ),
            'Drupal\\Component\\Render\\' => 
            array (
                0 => __DIR__ . '/..' . '/aleksip/plugin-data-transform/src',
            ),
            'Doctrine\\Common\\Collections\\' => 
            array (
                0 => __DIR__ . '/..' . '/doctrine/collections/lib',
            ),
        ),
        'C' => 
        array (
            'Colors' => 
            array (
                0 => __DIR__ . '/..' . '/kevinlebrun/colors.php/src',
            ),
        ),
        'A' => 
        array (
            'Alchemy' => 
            array (
                0 => __DIR__ . '/..' . '/alchemy/zippy/src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit23363f0bd8aad525c71c35ef52ed992a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit23363f0bd8aad525c71c35ef52ed992a::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit23363f0bd8aad525c71c35ef52ed992a::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
