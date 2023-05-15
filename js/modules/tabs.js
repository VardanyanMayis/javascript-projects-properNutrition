function tabs(tabsSelector, tabsParentDelector, tabsContentSelector, activeClass) {
	// Tabs
	const tabs = document.querySelectorAll(tabsSelector),
		tabsParent = document.querySelector(tabsParentDelector),
		tabsComntent = document.querySelectorAll(tabsContentSelector);


	function hiddenTabsContent() {
		tabsComntent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hidden');
		});

		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(index = 0) {
		tabsComntent[index].classList.remove('hidden');
		tabsComntent[index].classList.add('show', 'fade');

		tabs[index].classList.add(activeClass);
	}

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
    
		if(target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, index) => {
				if(item == target) {
					hiddenTabsContent();
					showTabContent(index);
				}
			});
		}
	});

	hiddenTabsContent();
	showTabContent();
}

export default tabs;
