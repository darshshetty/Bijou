// Ported from the Bijou design canvas.

export const products = [
      { name: 'The Oval', meta: 'Oval · Yellow gold, pavé band', shape: 'oval', metal: 'yellow', band: 'pave', pos: 'center 52%', img: '/images/p-oval-pave.jpg', alt: 'Oval diamond solitaire in yellow gold stacked with a pavé band' },
      { name: 'The Pear', meta: 'Pear · White gold, side stones', shape: 'pear', metal: 'white', band: 'pave', pos: 'center 50%', img: '/images/p-pear-sidestones.jpg', alt: 'Pear diamond with round side stones in white gold' },
      { name: 'The Emerald', meta: 'Emerald · Platinum', shape: 'emerald', metal: 'platinum', band: 'plain', pos: 'center 55%', img: '/images/p-emerald-solitaire.jpg', alt: 'Emerald-cut diamond four-prong solitaire in platinum' },
      { name: 'The Solitaire', meta: 'Round · Yellow gold', shape: 'round', metal: 'yellow', band: 'plain', pos: 'center 62%', img: '/images/p-solitaire-round.jpg', alt: 'Round diamond four-prong solitaire in yellow gold' },
      { name: 'The Halo', meta: 'Pear · Rose gold', shape: 'pear', metal: 'rose', band: 'pave', pos: 'center', img: '/images/setting-halo.jpg', alt: 'Pear-shaped diamond halo ring in rose gold on dark stone' },
      { name: 'The Classic', meta: 'Oval · Yellow gold', shape: 'oval', metal: 'yellow', band: 'plain', pos: 'center 45%', img: '/images/p-oval-classic.jpg', alt: 'Oval diamond four-prong solitaire in yellow gold on dark stone' },
      { name: 'The Blue Round', meta: 'Round blue · White gold, pavé band', shape: 'round', metal: 'white', band: 'pave', pos: '55% 56%', img: '/images/sig-blue-round.jpg', alt: 'Round blue lab-grown diamond in a four-prong white gold setting with a pavé band, on dark navy leather' },
      { name: 'The Three-Stone', meta: 'Round · White gold, pear sides', shape: 'round', metal: 'white', band: 'plain', pos: 'center 48%', img: '/images/p-three-stone.jpg', alt: 'Round diamond flanked by two pear-shaped side stones in white gold' },
      { name: 'The Emerald Eternity', meta: 'Emerald · Platinum band', shape: 'emerald', metal: 'platinum', band: 'pave', pos: 'center 52%', img: '/images/sig01.jpg', alt: 'Emerald-cut diamond eternity band in platinum on black fabric' },
      { name: 'The Pavé Round', meta: 'Round · Rose gold, pavé shoulders', shape: 'round', metal: 'rose', band: 'pave', pos: '45% 50%', img: '/images/sig02.jpg', alt: 'Round diamond solitaire in rose gold with three rows of pavé on the shoulders' },
      { name: 'The Marquise Burst', meta: 'Oval · White gold, marquise halo', shape: 'oval', metal: 'white', band: 'plain', pos: '55% 50%', img: '/images/sig03.jpg', alt: 'Oval diamond surrounded by a double halo of marquise stones in white gold' },
      { name: 'The Petite Pavé', meta: 'Round · White gold, graduated pavé', shape: 'round', metal: 'white', band: 'pave', pos: '48% 42%', img: '/images/sig04.jpg', alt: 'Small round diamond solitaire with a graduated pavé band in white gold' },
      { name: 'The Verde Halo', meta: 'Cushion · White gold, baguette halo', shape: 'cushion', metal: 'white', band: 'pave', pos: '57% 48%', img: '/images/sig06.jpg', alt: 'Green cushion-cut center stone in a double halo with baguettes and pavé shoulders, white gold' },
      { name: 'The Woodland Halo', meta: 'Round · White gold, halo', shape: 'round', metal: 'white', band: 'pave', pos: '55% 45%', img: '/images/sig07.jpg', alt: 'Round halo engagement ring resting in evergreen foliage' },
      { name: 'The Trillion', meta: 'Cushion · White gold, trillion sides', shape: 'cushion', metal: 'white', band: 'plain', pos: '50% 45%', img: '/images/sig08.jpg', alt: 'Black-and-white photo of a cushion-cut stone with trillion side stones on lace' },
      { name: 'The Cushion Halo', meta: 'Round · Yellow gold, cushion halo', shape: 'round', metal: 'yellow', band: 'pave', pos: 'center 38%', img: '/images/sig09.jpg', alt: 'Round diamond in a cushion-shaped halo with a pavé band in yellow gold, in a black ring box' },
      { name: 'The Princess Double Halo', meta: 'Princess · White gold, pavé', shape: 'princess', metal: 'white', band: 'pave', pos: 'center 55%', img: '/images/sig10.jpg', alt: 'Princess-cut diamond in a double halo with a pavé band in white gold' },
      { name: 'The Round Halo', meta: 'Round · White gold, pavé', shape: 'round', metal: 'white', band: 'pave', pos: '42% 55%', img: '/images/sig11.jpg', alt: 'Round diamond halo ring with a pavé band in white gold beside a dried leaf' },
      { name: 'The Cushion', meta: 'Cushion · White gold, pavé band', shape: 'cushion', metal: 'white', band: 'pave', pos: '53% 65%', img: '/images/sig12.jpg', alt: 'Elongated cushion-cut diamond solitaire with a pavé band in white gold beside autumn leaves' },
      { name: 'The Beaded Halo', meta: 'Oval · Rose gold, cluster', shape: 'oval', metal: 'rose', band: 'plain', pos: 'center 60%', img: '/images/sig13.jpg', alt: 'Oval diamond cluster with a beaded halo in rose gold' },
      { name: 'The Vintage Halo', meta: 'Round · Yellow gold, split shank', shape: 'round', metal: 'yellow', band: 'plain', pos: 'center 62%', img: '/images/sig14.jpg', alt: 'Round diamond cluster halo with milgrain edges and a split shank in yellow gold' },
      { name: 'The Bypass Bloom', meta: 'Round · Rose gold, floral halo', shape: 'round', metal: 'rose', band: 'plain', pos: 'center 48%', img: '/images/sig15.jpg', alt: 'Round diamond in a floral halo on a curved bypass band in rose gold' },
      { name: 'The Emerald Three-Stone', meta: 'Emerald · White gold, cushion sides', shape: 'emerald', metal: 'white', band: 'plain', pos: '50% 45%', img: '/images/sig16.jpg', alt: 'Emerald-cut diamond flanked by two cushion-cut side stones in white gold on navy leather' },
      { name: 'The Oval Pavé', meta: 'Oval · Yellow gold, pavé band', shape: 'oval', metal: 'yellow', band: 'pave', pos: 'center', img: '/images/sig17.jpg', alt: 'Oval diamond four-prong solitaire with a pavé band in yellow gold on white' },
      { name: 'The Halo Set', meta: 'Round · White gold, curved band', shape: 'round', metal: 'white', band: 'pave', pos: '60% 45%', img: '/images/sig18.jpg', alt: 'Round halo engagement ring with a curved pavé wedding band, resting inside a men’s band' },
      { name: 'The Bridal Set', meta: 'Round · White gold, pavé band', shape: 'round', metal: 'white', band: 'pave', pos: '48% 45%', img: '/images/sig19.jpg', alt: 'Round diamond solitaire with a matching pavé band on a sparkling background' }
    ];

export const tiles = [
        { title: 'Design it online', cta: 'Start designing', href: '/design', img: '/images/t-oval-stack-light.jpg', pos: 'center 45%', alt: 'An oval diamond solitaire and eternity band in yellow gold in rippling light' },
        { title: 'Start from a photo', cta: 'Upload inspiration', href: '/design', img: '/images/t-oval-leaves.jpg', pos: '48% center', alt: 'An oval solitaire in rose gold on a hand among green leaves' },
        { title: 'Design it together', cta: 'Book a Zoom session', href: '/session', img: '/images/f-round-halo-bw.jpg', pos: 'center 58%', alt: 'Black-and-white close-up of a couple holding hands, a round halo ring on her finger' }
      ];

export const moments = [
        { img: '/images/hero-proposal.jpg', pos: 'center 62%', alt: 'A smiling woman holds out her hand, showing a round diamond engagement ring' },
        { img: '/images/couple-show-ring.jpg', pos: 'center 52%', alt: 'A couple embraces as she holds out her oval engagement ring' },
        { img: '/images/moment-2.jpg', pos: 'center 62%', alt: 'A couple holds hands outdoors in autumn, an oval solitaire on her finger' },
        { img: '/images/moment-pear-hand.jpg', pos: 'center 45%', alt: 'A bride in a veil holds up her hand to show a pear-shaped diamond cluster ring' },
        { img: '/images/gallery-pear-bw.jpg', pos: '45% 50%', alt: 'Black-and-white photo of a hand resting on a partner’s chest, wearing a pear-shaped diamond ring with a pavé band' },
        { img: '/images/m-radiant-bw.jpg', pos: 'center 55%', alt: 'Black-and-white close-up of a hand wearing a radiant-cut solitaire' }
      ];

export const presets = [
        { name: 'Sunflower oval', desc: 'Oval · Platinum', pos: 'center 45%', img: '/images/ring-sunflower.jpg', s: { carat: '3.0', shape: 'oval', setting: 'solitaire', band: 'plain', metal: 'platinum' } },
        { name: 'Emerald three-stone', desc: 'Emerald · Platinum', pos: 'center 58%', img: '/images/moment-1.jpg', s: { carat: '2.0', shape: 'emerald', setting: 'three', band: 'plain', metal: 'platinum' } },
        { name: 'Vintage round', desc: 'Round · Rose gold', pos: '50% 48%', img: '/images/f-round-vintage.jpg', s: { carat: '1.0', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'rose' } },
        { name: 'Pear statement', desc: 'Pear · Yellow gold, pavé', pos: '55% 62%', img: '/images/t-pear-hand.jpg', s: { carat: '3.0', shape: 'pear', setting: 'solitaire', band: 'pave', metal: 'yellow' } },
        { name: 'Six-prong solitaire', desc: 'Round · White gold', pos: '38% 50%', img: '/images/f-sixprong-bw.jpg', s: { carat: '1.5', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Emerald halo', desc: 'Emerald · Platinum, pavé', pos: '53% 50%', img: '/images/moment-5.jpg', s: { carat: '1.5', shape: 'emerald', setting: 'halo', band: 'pave', metal: 'platinum' } },
        { name: 'Round halo', desc: 'Round · White gold, pavé', pos: 'center 58%', img: '/images/f-round-halo-bw.jpg', s: { carat: '1.0', shape: 'round', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Solitaire + band', desc: 'Round · White gold', pos: '60% 50%', img: '/images/moment-4.jpg', s: { carat: '1.5', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'The Classic', desc: 'Round · Platinum', pos: 'center 88%', img: '/images/f-solitaire-rail.jpg', s: { carat: '2.0', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'platinum' } },
        { name: 'The Solitaire', desc: 'Round · Yellow gold', pos: 'center 62%', img: '/images/p-solitaire-round.jpg', s: { carat: '1.5', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'yellow' } },
        { name: 'The Pear', desc: 'Pear · White gold', pos: 'center 50%', img: '/images/p-pear-sidestones.jpg', s: { carat: '2.0', shape: 'pear', setting: 'solitaire', band: 'pave', metal: 'white' } },
        { name: 'The Princess Halo', desc: 'Princess · White gold', pos: 'center 52%', img: '/images/p-princess-halo.jpg', s: { carat: '1.0', shape: 'princess', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Radiant solitaire', desc: 'Radiant · Platinum', pos: '74% 55%', img: '/images/fav01.jpg', s: { carat: '2.0', shape: 'radiant', setting: 'solitaire', band: 'pave', metal: 'platinum' } },
        { name: 'Baguette halo', desc: 'Emerald · White gold, pavé', pos: 'center 42%', img: '/images/fav02.jpg', s: { carat: '1.0', shape: 'emerald', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Pear double halo', desc: 'Pear · White gold, pavé', pos: '44% 32%', img: '/images/fav03.jpg', s: { carat: '1.0', shape: 'pear', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Cluster bloom', desc: 'Round · Rose gold, pavé', pos: '45% 40%', img: '/images/fav04.jpg', s: { carat: '1.0', shape: 'round', setting: 'halo', band: 'pave', metal: 'rose' } },
        { name: 'Oval halo', desc: 'Oval · Yellow gold, pavé', pos: 'center 42%', img: '/images/fav05.jpg', s: { carat: '2.0', shape: 'oval', setting: 'halo', band: 'pave', metal: 'yellow' } },
        { name: 'Cushion halo set', desc: 'Cushion · White gold, pavé', pos: '52% 58%', img: '/images/fav06.jpg', s: { carat: '1.0', shape: 'cushion', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Bridal solitaire', desc: 'Round · White gold', pos: '33% 43%', img: '/images/fav07.jpg', s: { carat: '1.5', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Vintage cluster', desc: 'Round · White gold, pavé', pos: 'center 62%', img: '/images/fav08.jpg', s: { carat: '1.0', shape: 'round', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Vine set', desc: 'Round · White gold, sidestones', pos: '70% 45%', img: '/images/fav09.jpg', s: { carat: '1.0', shape: 'round', setting: 'three', band: 'pave', metal: 'white' } },
        { name: 'Gold cluster', desc: 'Round · Yellow gold, pavé', pos: '56% 42%', img: '/images/fav10.jpg', s: { carat: '1.0', shape: 'round', setting: 'halo', band: 'pave', metal: 'yellow' } },
        { name: 'Marquise vine', desc: 'Marquise · White gold', pos: 'center 58%', img: '/images/fav11.jpg', s: { carat: '1.5', shape: 'marquise', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Five-stone', desc: 'Round · Yellow gold', pos: '52% 42%', img: '/images/fav12.jpg', s: { carat: '1.0', shape: 'round', setting: 'three', band: 'plain', metal: 'yellow' } },
        { name: 'Elongated cushion', desc: 'Cushion · Platinum', pos: '62% 55%', img: '/images/fav13.jpg', s: { carat: '2.5', shape: 'cushion', setting: 'solitaire', band: 'plain', metal: 'platinum' } },
        { name: 'Radiant on linen', desc: 'Radiant · Yellow gold', pos: 'center 62%', img: '/images/fav19.jpg', s: { carat: '3.0', shape: 'radiant', setting: 'solitaire', band: 'plain', metal: 'yellow' } },
        { name: 'Princess pavé set', desc: 'Princess · Rose gold, pavé', pos: '52% 45%', img: '/images/fav14.jpg', s: { carat: '1.5', shape: 'princess', setting: 'solitaire', band: 'pave', metal: 'rose' } },
        { name: 'Pear cluster', desc: 'Pear · White gold, pavé', pos: 'center 40%', img: '/images/fav15.jpg', s: { carat: '1.0', shape: 'pear', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Marquise crown', desc: 'Round · Rose gold', pos: '38% 45%', img: '/images/fav16.jpg', s: { carat: '2.0', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'rose' } },
        { name: 'Pear solitaire', desc: 'Pear · White gold, pavé', pos: 'center 48%', img: '/images/fav17.jpg', s: { carat: '2.0', shape: 'pear', setting: 'solitaire', band: 'pave', metal: 'white' } },
        { name: 'Square cluster set', desc: 'Princess · White gold, channel', pos: '58% 40%', img: '/images/fav18.jpg', s: { carat: '1.0', shape: 'princess', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Rose gold solitaire', desc: 'Round · Rose gold', pos: 'center 45%', img: '/images/moment-3.jpg', s: { carat: '2.0', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'rose' } },
        { name: 'Cushion on rose', desc: 'Cushion · Rose gold', pos: '52% 62%', img: '/images/cs01.jpg', s: { carat: '0.75', shape: 'cushion', setting: 'solitaire', band: 'plain', metal: 'rose' } },
        { name: 'Canary pear', desc: 'Pear · White gold', pos: '54% 42%', img: '/images/cs02.jpg', s: { carat: '0.75', shape: 'pear', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Six-prong pavé', desc: 'Round · White gold, pavé', pos: '50% 58%', img: '/images/cs04.jpg', s: { carat: '1.0', shape: 'round', setting: 'solitaire', prongs: '6', band: 'pave', metal: 'white' } },
        { name: 'Grand six-prong', desc: 'Round · White gold, pavé', pos: '50% 52%', img: '/images/cs05.jpg', s: { carat: '2.5', shape: 'round', setting: 'solitaire', prongs: '6', band: 'pave', metal: 'white' } },
        { name: 'Pear halo chevron', desc: 'Pear · White gold, halo', pos: '50% 45%', img: '/images/cs06.jpg', s: { carat: '1.5', shape: 'pear', setting: 'halo', band: 'pave', metal: 'white' } },
        { name: 'Oval & band', desc: 'Oval · White gold', pos: '42% 45%', img: '/images/cs07.jpg', s: { carat: '2.0', shape: 'oval', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Café round', desc: 'Round · White gold', pos: '50% 45%', img: '/images/cs08.jpg', s: { carat: '2.0', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Emerald bypass', desc: 'Emerald · Yellow gold', pos: '50% 50%', img: '/images/cs09.jpg', s: { carat: '1.5', shape: 'emerald', setting: 'solitaire', band: 'plain', metal: 'yellow' } },
        { name: 'Seaside three-stone', desc: 'Oval · Yellow gold, pear sides', pos: '45% 52%', img: '/images/cs10.jpg', s: { carat: '2.0', shape: 'oval', setting: 'three', band: 'plain', metal: 'yellow' } },
        { name: 'Evening solitaire', desc: 'Round · White gold', pos: '50% 48%', img: '/images/cs12.jpg', s: { carat: '1.0', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Beach solitaire', desc: 'Round · White gold', pos: '50% 40%', img: '/images/cs13.jpg', s: { carat: '1.0', shape: 'round', setting: 'solitaire', band: 'plain', metal: 'white' } },
        { name: 'Radiant & band', desc: 'Radiant · Platinum', pos: '62% 58%', img: '/images/cs14.jpg', s: { carat: '1.5', shape: 'radiant', setting: 'solitaire', band: 'plain', metal: 'platinum' } },
        { name: 'Elongated radiant', desc: 'Radiant · Platinum', pos: '50% 45%', img: '/images/cs15.jpg', s: { carat: '1.5', shape: 'radiant', setting: 'solitaire', band: 'plain', metal: 'platinum' } },
        { name: 'Golden hour oval', desc: 'Oval · Yellow gold', pos: '50% 42%', img: '/images/cs16.jpg', s: { carat: '2.0', shape: 'oval', setting: 'solitaire', prongs: '6', band: 'plain', metal: 'yellow' } },
        { name: 'Princess stack', desc: 'Princess · Yellow gold, pavé', pos: '58% 62%', img: '/images/cs18.jpg', s: { carat: '0.75', shape: 'princess', setting: 'solitaire', band: 'pave', metal: 'yellow' } },
        { name: 'Blush emerald', desc: 'Emerald · Yellow gold', pos: '45% 58%', img: '/images/cs19.jpg', s: { carat: '3.0', shape: 'emerald', setting: 'solitaire', band: 'plain', metal: 'yellow' } },
        { name: 'Starburst cluster', desc: 'Round · Yellow gold, cluster', pos: '50% 48%', img: '/images/cs20.jpg', s: { carat: '1.0', shape: 'round', setting: 'cluster', band: 'plain', metal: 'yellow' } },
        { name: 'Statement cushion', desc: 'Cushion · Yellow gold, pavé', pos: '54% 38%', img: '/images/cs22.jpg', s: { carat: '4.0', shape: 'cushion', setting: 'solitaire', prongs: '4', band: 'pave', metal: 'yellow' } },
        { name: 'Classic six-prong', desc: 'Round · White gold', pos: '37% 52%', img: '/images/cs23.jpg', s: { carat: '1.0', shape: 'round', setting: 'solitaire', prongs: '6', band: 'plain', metal: 'white' } },
        { name: 'Oval with accents', desc: 'Oval · Yellow gold, side stones', pos: '78% 60%', img: '/images/cs25.jpg', s: { carat: '1.0', shape: 'oval', setting: 'three', prongs: '4', band: 'plain', metal: 'yellow' } },
        { name: 'Channel-set band', desc: 'Round · White gold, wide pavé', pos: '50% 52%', img: '/images/cs27.jpg', s: { carat: '1.0', shape: 'round', setting: 'solitaire', prongs: '4', band: 'pave', metal: 'white' } }
      ];

export const rings = [
      { id: 'white', name: 'Round \u00b7 White gold, pav\u00e9', carat: '2.0', shape: 'round', metal: 'white', band: 'pave', top: '/images/bld2.jpg', angle: '/images/bld1.jpg', alt: 'round lab-grown diamond six-prong solitaire with a pav\u00e9 band in white gold' },
      { id: 'rose', name: 'Round \u00b7 Rose gold', carat: '1.0', shape: 'round', metal: 'rose', band: 'plain', top: '/images/bld4.jpg', angle: '/images/bld3.jpg', alt: 'round lab-grown diamond six-prong solitaire on a plain rose gold band' },
      { id: 'yellow', name: 'Oval \u00b7 Yellow gold, pav\u00e9', carat: '3.0', shape: 'oval', metal: 'yellow', band: 'pave', top: '/images/bld6.jpg', angle: '/images/bld5.jpg', alt: 'oval lab-grown diamond four-prong solitaire with a pav\u00e9 band in yellow gold' }
    ];
