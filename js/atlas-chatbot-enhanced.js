// Enhanced Atlas Chatbot with expanded knowledge
// Generated from ATLAS-KNOWLEDGE-BASE.md

(function(){
  // Wait for DOM to be ready
  const tg=document.getElementById('atlasToggle');
  const ch=document.getElementById('atlasChat');
  const ms=document.getElementById('cm');
  const ip=document.getElementById('ci');
  const sb=document.getElementById('csb');
  const qa=document.getElementById('qa');
  
  // Get mascot image source after DOM is loaded
  const mascotImg = document.getElementById('mascotImg');
  const MSRC = mascotImg ? mascotImg.src : 'images/atlas/atlas-avatar.png';
  
  let o=false, g=false;
  
  // Check if all elements exist
  if (!tg || !ch || !ms || !ip || !sb || !qa) {
    console.error('Atlas chatbot: Required elements not found');
    return;
  }
  
  tg.onclick=()=>{
    o=!o;
    tg.classList.toggle('open',o);
    ch.classList.toggle('visible',o);
    if(o&&!g){
      g=true;
      setTimeout(()=>bot("Hey — I'm <strong>Atlas</strong>, the Cal Strong bear! I can help with info about our gymnastics programs, schedules, parties, registration, or anything else. What can I do for you?"),400);
    }
    if(o)setTimeout(()=>ip.focus(),350);
  };
  
  qa.onclick=e=>{
    const b=e.target.closest('.qb');
    if(!b)return;
    go(b.dataset.msg);
    qa.style.display='none';
  };
  
  sb.onclick=ts;
  ip.onkeydown=e=>{if(e.key==='Enter')ts()};
  
  function ts(){
    const t=ip.value.trim();
    if(!t)return;
    ip.value='';
    go(t);
  }
  
  function go(t){
    usr(t);
    qa.style.display='none';
    typ(1);
    setTimeout(()=>{
      typ(0);
      bot(res(t));
    },600+Math.random()*700);
  }
  
  function usr(t){add('user',esc(t))}
  function bot(h){add('bot',h)}
  
  function add(t,h){
    const d=document.createElement('div');
    d.className='msg '+t;
    d.innerHTML=t==='bot'?'<div class="mav"><img src="'+MSRC+'" alt=""/></div><div class="mb">'+h+'</div>':'<div class="mb">'+h+'</div>';
    ms.appendChild(d);
    ms.scrollTop=ms.scrollHeight;
  }
  
  function typ(on){
    if(on){
      const d=document.createElement('div');
      d.className='msg bot';
      d.id='tp';
      d.innerHTML='<div class="mav"><img src="'+MSRC+'" alt=""/></div><div class="mb"><div class="ti"><span></span><span></span><span></span></div></div>';
      ms.appendChild(d);
      ms.scrollTop=ms.scrollHeight;
    }else{
      const t=document.getElementById('tp');
      if(t)t.remove();
    }
  }
  
  function esc(s){
    const d=document.createElement('div');
    d.textContent=s;
    return d.innerHTML;
  }
  
  function res(i){
    const q=i.toLowerCase();
    
    // Pricing questions
    if(/how much|cost|price|tuition|fee/i.test(q)){
      if(/6|six|7|seven|8|eight|rec|older/i.test(q)){
        return"Great question! For kids 5.5 and older, we have Recreational Gymnastics with three tiers:<br><br><strong>Kickoff:</strong> $145/month (1 class/week)<br><strong>Platinum:</strong> $185/month (2 classes/week + quarterly evaluations + skill tree)<br><strong>Ultimate:</strong> $199/month (3 classes/week + extra perks)<br><br>Classes are 70 minutes for Levels 1/2 or 90 minutes for Levels 3/4 - longest in the Bay Area! Plus a one-time $75 annual insurance fee. Enroll at <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>our portal</a>!";
      }
      if(/kinder|young|toddler|1|2|3|4|5|preschool/i.test(q)){
        return"Perfect! For ages 1-5.5, we have KinderGym:<br><br><strong>Kickoff:</strong> $125/month (1 class/week)<br><strong>Platinum:</strong> $165/month (2 classes/week + quarterly evaluations)<br><strong>Ultimate:</strong> $199/month (3 classes/week)<br><br>Classes are 45 minutes of play-based learning. Plus a one-time $75 annual insurance fee. They age out at 5.5 and move to Rec! Enroll at <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>our portal</a>!";
      }
      if(/team|competitive/i.test(q)){
        return"Competitive Team costs vary by level:<br><br><strong>Monthly:</strong> $280-287/month (6-19 hours/week depending on level)<br><strong>Annual costs:</strong> ~$5,000-6,000+ including uniform ($350), meet fees ($720-750), coach fees ($400), plus travel<br><br>Tryouts are once per year. We recommend starting in rec classes first to build foundation! Contact <a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a> for details.";
      }
      if(/adult/i.test(q)){
        return"Adult Gymnastics (ages 16+) uses a punch pass system:<br><br><strong>Single class:</strong> $25<br><strong>8-class bundle:</strong> $160 (saves $40!)<br><br>Classes never expire. Tuesdays & Wednesdays at 7:30 PM - Handstand Basics & Open Gym. No experience needed! Buy passes at <a href='https://www.californiastrongathletics.com/portal/proshop' target='_blank'>our Pro Shop</a>.";
      }
      return"We have programs for all ages!<br><br><strong>KinderGym (1-5.5):</strong> $125-199/month<br><strong>Rec/Tumbling (5.5+):</strong> $145-199/month<br><strong>Adult (16+):</strong> $25/class or $160/8 classes<br><br>Plus one-time $75 annual insurance fee. View full pricing at <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>our portal</a>!";
    }
    
    // Trial/refund questions
    if(/trial|try|free class|test|first.*class/i.test(q)){
      return"We don't offer trial classes, and here's why: building skills takes time! You can't judge if your child loves gymnastics from one 45-minute class.<br><br>Instead, we offer a <strong>30-day trial with tuition refund</strong>. Enroll, attend all available classes for 30 days (4-5 classes), and if it's not the right fit, cancel and get your tuition back. You're only out the $75 insurance fee.<br><br>This gives your child a real chance to discover if they love gymnastics!";
    }
    
    if(/refund|money.*back|cancel|don.*like|hate/i.test(q)){
      return"Our 30-day trial means: attend all available classes for 30 days, and if it's not the right fit, you can cancel and get your <strong>tuition refunded</strong>. The $75 annual insurance fee is non-refundable.<br><br>Building skills and comfort takes time - one class isn't enough to know! Give it the full 30 days with consistent attendance. To cancel, go to the portal or email <a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a> <strong>before the end of the month</strong>.";
    }
    
    // Enrollment questions
    if(/sign.*up|enroll|register|join|start|how.*do.*i/i.test(q)){
      return"Enrollment is easy - all online!<br><br>1. Go to <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>our portal</a><br>2. Create family account<br>3. Add your child's info<br>4. Select a class<br>5. Enter payment (card on file required)<br><br>You'll be charged first month tuition + $75 insurance fee. All waivers done online. Questions? Email <a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a>!";
    }
    
    // Schedule questions
    if(/schedule|time|hour|when|open/i.test(q)){
      return"<strong>Hours:</strong><br>Mon-Fri: 2:00 PM - 8:00 PM<br>Saturday: 8:00 AM - 5:00 PM<br>Sunday: 8:00 AM - 1:00 PM (Team only)<br><br><strong>Class times:</strong> View full schedule at <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>our portal</a>!<br><br>Adult classes: Tue & Wed 7:30 PM. Open Gym: First & Last Saturday 6:30-8 PM. Parents Night Out: Select Fridays 5:30-9 PM.";
    }
    
    // Program questions
    if(/program|class|offer|what.*do.*you/i.test(q)){
      return"Here's our full lineup:<br><br><strong>KinderGym</strong> — Ages 1-5.5. Play-based learning, 45-min classes.<br><strong>Girls Gymnastics</strong> — Ages 5.5-14. Cartwheels, beams, confidence. 70-90 min classes.<br><strong>Boys Gymnastics</strong> — Ages 5.5-14. Train hard, dream big. 70-90 min classes.<br><strong>Coed Tumbling</strong> — Ages 5.5-16. Flips, twists, tumbles. 60-min classes.<br><strong>Competitive Team</strong> — Ages 5-18. USAGYM-trained coaching.<br><strong>Adult Gymnastics</strong> — 16+. Tue & Wed 7:30 PM.<br><br>We also host birthday parties, camps, and special events!";
    }
    
    // Age-specific questions
    if(/age|old|year/i.test(q)){
      if(/4|four|young/i.test(q)){
        return"At 4 years old, your child should be in <strong>KinderGym</strong> (ages 1-5.5). It's 45 minutes of play-based learning perfect for littles! Pricing: $125-199/month depending on tier. They'll age out at 5.5 and move to Rec Level 1!";
      }
      if(/6|six|7|seven/i.test(q)){
        return"At 6-7 years old, your child should be in <strong>Rec Level 1</strong> (ages 5.5+). Classes are 70 minutes (way longer than typical gyms!). Pricing: $145-199/month depending on tier. Perfect for building gymnastics fundamentals!";
      }
      if(/15|16|teen|adult/i.test(q)){
        return"At 15-16+, join our <strong>Adult Gymnastics</strong> class! Tuesdays & Wednesdays 7:30 PM. No experience needed - handstand basics, tumbling, open gym. $25/class or $160 for 8-class bundle. All skill levels welcome!";
      }
    }
    
    // Sibling questions
    if(/sibling|brother|sister|two.*kid|both.*kid/i.test(q)){
      return"Great news! You get a <strong>20% sibling discount</strong> on the second child (and additional siblings). Plus, since Rec and Tumbling are priced the same, you can MIX programs - like 1 Rec + 1 Tumbling class per week under one Platinum membership!<br><br>We can also help coordinate overlapping class times so both kids are at the gym together. Email <a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a> and say 'I need overlapping class times for siblings' - we'll help!";
    }
    
    // Party questions
    if(/party|parties|birthday/i.test(q)){
      return"We host unforgettable birthday bashes!<br><br><strong>Ninja Plus:</strong> $399 (10 kids) - 1 host<br><strong>Ninja Gold ⭐:</strong> $499 (15 kids) - 2 hosts<br><strong>Ninja Extreme:</strong> $599 (20 kids) - 2 hosts<br><br>Additional kids $20 each. Add-ons: extended gym time (+$75), extra coaches (+$75), bounce house (+$100).<br><br>Includes 1hr gym time + 30min party room. You bring decorations, food, plates. Book at <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>the portal</a> or call (925) 826-5690!";
    }
    
    // Location questions
    if(/location|where|address|direction/i.test(q)){
      return"<strong>2231 Commerce Avenue</strong><br>Concord, California 94520<br><br>Plenty of parking in our lot! Call <a href='tel:925-826-5690'>(925) 826-5690</a> if you need directions.";
    }
    
    // Cancellation/billing
    if(/cancel|quit|drop|stop/i.test(q)){
      return"To cancel, submit a drop notice in the <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>portal</a> or email <a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a> <strong>before the end of the month</strong> (by 11:59pm last day).<br><br>We process billing on the 1st. Cancel by month-end = no next month charge. Cancel on the 1st or later = charged for that month (no refunds, but classes available).";
    }
    
    // Makeup/bonus classes
    if(/make.*up|makeup|miss|absent|bonus/i.test(q)){
      return"We don't offer traditional makeup classes, but here's what you get:<br><br><strong>Bonus classes each month:</strong><br>- Kickoff: 1 bonus class<br>- Platinum/Ultimate: 2 bonus classes<br><br>These DON'T roll over - use them or lose them! To use: find an available class in the <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>portal</a>, then email <a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a> to request registration. Perfect for making up missed classes!";
    }
    
    // What to wear/bring
    if(/wear|bring|need|clothes/i.test(q)){
      return"<strong>Dress code:</strong><br>- Tight-fitting clothing (not loose)<br>- Girls: shirt that won't go over head when upside down<br>- Boys: shorts & t-shirt OK<br>- Hair in ponytail<br>- NO jewelry or necklaces<br><br><strong>Bring:</strong> Water bottle (we don't provide cups). Don't enter gym barefoot - wear socks or buy trampoline socks here!<br><br><strong>First day:</strong> You'll get a welcome package with coupons, water bottle, and stickers!";
    }
    
    // Safety/injury
    if(/safe|safety|hurt|injur/i.test(q)){
      return"Safety is our top priority! If a child gets injured:<br><br>1. Coaches assess & provide first aid (full medical equipment on-site)<br>2. Injury documented<br>3. Parents called immediately<br>4. Child sits out until parent picks up<br><br>Our staff is USAGYM-trained professionals. We carry liability insurance (covered by your $75 annual fee). Regular safety training keeps students safe while challenged!";
    }
    
    // Watch/observe
    if(/watch|observe|parent|lobby/i.test(q)){
      return"Parents watch from the <strong>lobby</strong>! We have 3 large windows PLUS a big TV showing live camera feeds from all across the gym.<br><br>Parents are NOT allowed in the gym (except parent-tot KinderGym where you participate with your child). This helps kids focus and build independence.<br><br><strong>First day exception:</strong> If your child has severe anxiety and won't enter alone, we may allow you in briefly. After that, lobby only!";
    }
    
    // Competitive team
    if(/team|competitive|tryout/i.test(q)){
      return"<strong>Competitive Team Details:</strong><br><br><strong>Tryouts:</strong> Once per year (plus rolling invites). We evaluate engagement, coachability, and competition readiness.<br><br><strong>Time commitment:</strong><br>- Level 2: 6 hrs/week<br>- Level 3: 9 hrs/week<br>- Level 4: 12 hrs/week<br>- Level 5+: 19 hrs/week<br><br><strong>Cost:</strong> ~$5,000-6,000+/year<br><br><strong>Recommendation:</strong> Start in rec classes first to build foundation and see if your child loves gymnastics!";
    }
    
    // App/download
    if(/app|download/i.test(q)){
      return"Download our mobile app to enroll, check attendance, book parties, and more — all on the go!<br><br>Use keyword: <strong>CSAGYMNASTICS</strong>";
    }
    
    // Greeting responses
    if(/^(hi|hello|hey|yo)$/i.test(q)){
      return"Atlas here! Ask me about programs, schedules, parties, registration, or anything Cal Strong!";
    }
    
    if(/thank/i.test(q)){
      return"You're welcome! If you need anything else, just ask. Enroll at <a href='https://portal.iclasspro.com/csagymnastics' target='_blank'>our portal</a> or email <a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a>!";
    }
    
    // Default response
    return"For the best answer on that, reach out to our team at <strong><a href='mailto:info@californiastrongathletics.com'>info@californiastrongathletics.com</a></strong> or call <strong><a href='tel:925-826-5690'>(925) 826-5690</a></strong>. Or ask me about programs, schedules, pricing, parties, or how to get started!";
  }
})();
