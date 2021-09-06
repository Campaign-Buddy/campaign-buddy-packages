import React, { ComponentProps, useCallback, useMemo, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Modal, Button } from '../src';

export default {
	title: 'core-ui/Modal',
	component: Modal,
} as Meta;

const LongContent = () => (
	<>
		<p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
      tristique, leo eu vulputate imperdiet, metus justo pellentesque est, a
      consequat dui turpis quis odio. Vivamus eget ligula vitae orci rhoncus
      viverra non ut diam. Praesent tellus mi, feugiat vel tortor vel, dignissim
      vulputate justo. Cras in feugiat mi. Nullam et nibh eu ex gravida
      lobortis. Maecenas ultricies condimentum augue, vel fermentum enim
      pharetra sit amet. Aenean ullamcorper, ante id euismod viverra, lacus ante
      malesuada tortor, sed porttitor ex velit non turpis. Donec eu semper
      lectus. Maecenas mattis semper auctor. Phasellus ac congue lectus, sed
      ultrices odio. Suspendisse vulputate, erat quis tempus ultricies, sem
      dolor luctus lorem, ac gravida justo est ut enim. Fusce ornare lorem id
      vestibulum aliquam. Praesent vestibulum est rhoncus erat porta eleifend.
      Aliquam nec semper massa, et maximus purus.
		</p>

		<p>
      Aenean tincidunt ante non velit eleifend, a elementum enim lobortis. Nam
      mollis diam sem, ut sagittis quam placerat eget. Phasellus viverra lacus
      quam, eget elementum lorem porttitor id. Etiam nec mauris ante. Phasellus
      lectus quam, pretium vitae pulvinar eu, consequat in velit. Aliquam sed
      nisl massa. Fusce euismod varius tellus. Orci varius natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
		</p>

		<p>
      In lorem turpis, placerat et lacinia non, hendrerit eu lacus. Donec quis
      bibendum nibh. Integer interdum urna purus. Morbi massa massa, volutpat in
      interdum ultricies, elementum non erat. Vivamus porttitor consectetur
      elit. Aenean placerat venenatis sollicitudin. Donec faucibus magna et
      ornare malesuada. Praesent nec purus ipsum. Maecenas eu luctus nunc.
      Suspendisse suscipit purus nunc, in ultricies lacus commodo a. Etiam
      varius metus sed mattis viverra. Aliquam pharetra sapien at lectus egestas
      commodo. Donec leo est, luctus eu viverra quis, venenatis rhoncus nunc.
		</p>

		<p>
      Nulla dictum turpis sed velit lacinia, id porta arcu tincidunt. Cras elit
      justo, fermentum vulputate enim nec, cursus sollicitudin sem. Etiam
      pretium ex vel est porttitor rutrum. Integer viverra enim sapien, non
      cursus risus pharetra ut. Sed vitae tortor libero. Nulla dictum luctus
      felis vel tincidunt. Etiam id tempor lorem. Aliquam sit amet tortor ac
      justo rutrum venenatis nec a justo. Nunc sollicitudin sodales nunc a
      ornare. Maecenas quis sollicitudin diam, id molestie ipsum. Ut vitae
      sagittis nunc. Etiam ipsum quam, faucibus convallis leo sit amet, placerat
      ornare nulla. Proin maximus urna pellentesque, euismod magna ac,
      condimentum lectus. Donec nec dolor enim.
		</p>

		<p>
      Integer quis sodales tellus. Maecenas vel ex vel turpis bibendum mattis
      non bibendum tellus. Duis ac condimentum odio. In id dolor id nunc
      vehicula euismod sed ac tellus. Proin id pulvinar ante. Proin accumsan id
      nisi et tincidunt. Vivamus in risus eget nisi accumsan iaculis sit amet ac
      eros. Nam euismod ligula mauris, eget imperdiet nisl efficitur in. In
      consequat nibh erat, luctus vulputate augue eleifend tempor. Nulla
      consequat sagittis mauris et commodo. Nullam ac fringilla ante, ut
      convallis urna. Duis eu hendrerit ex.
		</p>
	</>
);

const Template: Story = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIsOpen = useCallback(() => setIsOpen((prev) => !prev), []);

	const footerButtons = useMemo<ComponentProps<typeof Modal>['footerButtons']>(
		() => [
			{
				text: 'All Done Here',
				onClick: () => setIsOpen(false),
			},
		],
		[]
	);

	return (
		<div>
			<Button onClick={toggleIsOpen}>Open Modal</Button>
			<Modal
				isOpen={isOpen}
				onClose={toggleIsOpen}
				title="I am a modal"
				footerButtons={footerButtons}
			>
				<LongContent />
			</Modal>
		</div>
	);
};

export const Primary = Template.bind({});
