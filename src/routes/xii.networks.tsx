import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xii/networks")({
  head: () => ({
    meta: [
      { title: "Computer Networks — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Detailed networking notes for CBSE Class XII — evolution, switching, transmission media, devices, topologies, network types, IP/MAC, protocols, web services and cloud.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/networks">
      <Section title="What is a computer network?">
        <p>
          A <b>computer network</b> is a group of two or more computing devices
          connected together so they can <b>share data and resources</b> (files,
          printers, internet). Benefits:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Resource sharing — one printer for the whole office.</li>
          <li>File sharing — Google Drive, school server.</li>
          <li>Communication — email, video calls, chat.</li>
          <li>Centralised storage and backup.</li>
          <li>Cost savings — shared internet, shared software licences.</li>
        </ul>
      </Section>

      <Section title="Evolution of networking">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>ARPANET</b> (1969) — first packet-switched network, US Department of Defense; linked 4 universities.</li>
          <li><b>NSFNET</b> (1986) — National Science Foundation network in the US, opened to academia.</li>
          <li><b>INTERNET</b> — the global "network of networks" today; uses TCP/IP and is owned by no one.</li>
          <li><b>Interspace</b> — a vision of a 3D, multi-user collaborative environment over the internet.</li>
        </ul>
      </Section>

      <Section title="Data communication terms">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sender</b>, <b>Receiver</b>, <b>Message</b>, <b>Medium</b>, <b>Protocol</b> — the 5 components.</li>
          <li><b>Bandwidth</b> — max data the channel can carry, measured in Hz or bits/s.</li>
          <li><b>Data transfer rate</b> — actual bits transferred per second (bps, Kbps, Mbps, Gbps).</li>
          <li><b>Bit rate vs Baud rate</b> — bits/s vs signal changes/s.</li>
          <li><b>Latency</b> — delay between sending and receiving (ping in ms).</li>
          <li><b>Throughput</b> — measured useful data rate.</li>
          <li><b>Noise & Attenuation</b> — unwanted signal and signal weakening over distance.</li>
        </ul>
      </Section>

      <Section title="Switching techniques">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Circuit switching</b> — a dedicated path is reserved for the entire
            conversation (old telephone calls). Wastes bandwidth when idle but
            guarantees quality.
          </li>
          <li>
            <b>Message switching</b> — entire message stored at intermediate nodes,
            then forwarded ("store-and-forward"). Slow.
          </li>
          <li>
            <b>Packet switching</b> — message split into small <b>packets</b>; each
            packet may take a different route, reassembled at destination. Used by the
            Internet. Efficient and fault-tolerant.
          </li>
        </ul>
      </Section>

      <Section title="Transmission media">
        <p><b>Wired (Guided):</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Twisted Pair</b> (UTP/STP) — Cat5e, Cat6 LAN cables. Cheap, used in offices and homes.</li>
          <li><b>Coaxial</b> — single thick conductor, used for cable TV and older broadband.</li>
          <li><b>Fibre Optic</b> — light through glass core. Very high bandwidth (Gbps–Tbps), no EMI, used in undersea/internet backbones.</li>
        </ul>
        <p><b>Wireless (Unguided):</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Radio waves</b> — Wi-Fi, FM/AM radio, cordless phones.</li>
          <li><b>Microwaves</b> — line-of-sight, mobile towers, satellite links.</li>
          <li><b>Infrared</b> — short-range, line-of-sight (TV remote, old IrDA).</li>
          <li><b>Bluetooth</b> — 2.4 GHz, ~10 m, headphones, file share.</li>
          <li><b>Satellite</b> — geostationary; used for remote areas, broadcast, GPS.</li>
        </ul>
      </Section>

      <Section title="Network devices">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>NIC (Network Interface Card)</b> — hardware that gives each device a unique MAC address; the actual port your cable plugs into.</li>
          <li><b>Modem</b> — Modulator-Demodulator; converts digital ↔ analog so data can travel over phone/cable lines (your ISP box).</li>
          <li><b>Repeater</b> — regenerates a weak signal so it can travel further.</li>
          <li><b>Hub</b> — broadcasts incoming data to all ports (dumb device, rarely used today).</li>
          <li><b>Switch</b> — sends data only to the intended port using MAC addresses (smart hub).</li>
          <li><b>Bridge</b> — connects two LAN segments and filters traffic between them.</li>
          <li><b>Router</b> — connects different networks (your home Wi-Fi router connects LAN ↔ Internet); uses IP addresses.</li>
          <li><b>Gateway</b> — connects networks that use different protocols (entry/exit point).</li>
          <li><b>Access Point (AP)</b> — provides wireless connectivity for a wired network.</li>
        </ul>
      </Section>

      <Section title="Network topologies">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Bus</b> — single backbone cable; cheap; entire network fails if backbone breaks; collisions common.
          </li>
          <li>
            <b>Star</b> — every device connects to a central hub/switch; easy to add/remove nodes; central failure = whole network down. <b>Most common</b> in modern offices and homes.
          </li>
          <li>
            <b>Ring</b> — each node connects to two neighbours forming a circle; data travels in one direction; one break disrupts all.
          </li>
          <li>
            <b>Mesh</b> — every node connects to every other node; very reliable, very expensive cabling; used in military and Internet backbones.
          </li>
          <li>
            <b>Tree</b> — hierarchy of star networks (a backbone with star branches); used in cable TV networks and large enterprises.
          </li>
        </ul>
      </Section>

      <Section title="Network types by area">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>PAN (Personal Area Network)</b> — within a few metres; Bluetooth headphones, your phone hotspot.</li>
          <li><b>LAN (Local Area Network)</b> — within a building/campus; school computer lab, home Wi-Fi. High speed, owned by one organisation.</li>
          <li><b>MAN (Metropolitan Area Network)</b> — across a city; cable TV networks, citywide Wi-Fi.</li>
          <li><b>WAN (Wide Area Network)</b> — across countries/continents; the Internet itself, banking networks.</li>
        </ul>
      </Section>

      <Section title="Identifying devices on a network">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>MAC address</b> — 48-bit hardware address burned into NIC, written as
            6 hex pairs e.g. <code>1A:2B:3C:4D:5E:6F</code>. Permanent and unique.
          </li>
          <li>
            <b>IP address</b> — logical address assigned by the network.
            <ul className="mt-1 list-[circle] space-y-0.5 pl-5">
              <li><b>IPv4</b> — 32-bit, four octets, e.g. <code>192.168.1.5</code> (~4.3 billion possible).</li>
              <li><b>IPv6</b> — 128-bit, eight hex groups, e.g. <code>2001:0db8::1</code> (effectively unlimited).</li>
            </ul>
          </li>
          <li><b>Domain name</b> — human-friendly name like <code>cbse.gov.in</code>.</li>
          <li><b>DNS (Domain Name System)</b> — translates domain names to IP addresses.</li>
          <li><b>URL</b> — Uniform Resource Locator: <code>https://example.com:443/path?q=1</code>.</li>
        </ul>
      </Section>

      <Section title="Common protocols">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>TCP/IP</b> — the internet's core suite. TCP guarantees delivery and order; IP routes packets.</li>
          <li><b>UDP</b> — fast, connectionless; used by video calls and online games where speed matters more than perfect delivery.</li>
          <li><b>HTTP / HTTPS</b> — web browsing (HTTPS = HTTP over SSL/TLS, encrypted).</li>
          <li><b>FTP</b> — File Transfer Protocol; upload/download files between client and server.</li>
          <li><b>SMTP</b> — sends email out from a client to a mail server.</li>
          <li><b>POP3 / IMAP</b> — retrieves email from server (POP3 downloads, IMAP keeps a synced copy).</li>
          <li><b>TELNET / SSH</b> — remote login to another computer (SSH is secure).</li>
          <li><b>VoIP</b> — Voice over IP; WhatsApp/Teams calls, Skype.</li>
          <li><b>PPP</b> — Point-to-Point Protocol used by dial-up/DSL.</li>
          <li><b>DHCP</b> — automatically assigns IP addresses to devices joining a network.</li>
        </ul>
      </Section>

      <Section title="Web & web services">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>WWW</b> — collection of interlinked documents (web pages) accessible via the Internet.</li>
          <li><b>Web server</b> — software (Apache, Nginx) that stores and serves web pages.</li>
          <li><b>Web browser</b> — Chrome, Firefox, Safari — requests and renders pages.</li>
          <li><b>HTML</b> — structures content. <b>CSS</b> — styling. <b>JavaScript</b> — interactivity.</li>
          <li><b>XML / JSON</b> — data exchange formats between systems.</li>
          <li><b>Web hosting</b> — putting your site on a public server.</li>
          <li><b>Web 2.0</b> — interactive, user-generated content (Wikipedia, YouTube, Instagram).</li>
        </ul>
        <Callout>
          When you type <code>www.cbse.gov.in</code>, your browser asks DNS for the
          IP, opens a TCP connection to port 443, sends an HTTPS GET request, the
          server returns the HTML, and the browser renders it.
        </Callout>
      </Section>

      <Section title="Network security basics">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Firewall</b> — filters incoming/outgoing traffic based on rules.</li>
          <li><b>Encryption</b> — converts data into unreadable form (HTTPS, WPA2 Wi-Fi).</li>
          <li><b>VPN</b> — creates an encrypted tunnel over a public network.</li>
          <li><b>Cookies</b> — small files a website stores on your device for session/state.</li>
          <li><b>Threats</b> — viruses, worms, spyware, phishing, DoS attacks (covered in Class XI ethics).</li>
        </ul>
      </Section>

      <Section title="Cloud computing & IoT (modern context)">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Cloud</b> — on-demand computing over the Internet (AWS, Azure, GCP). Models: <b>IaaS</b>, <b>PaaS</b>, <b>SaaS</b>.</li>
          <li><b>IoT</b> — "Internet of Things" — physical devices (smart watches, sensors, fridges, cars) that exchange data over the Internet.</li>
        </ul>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which device connects two different networks using IP addresses?"
          options={["Hub", "Switch", "Router", "Repeater"]}
          answer="Router"
        />
        <QuickCheck
          question="A network spread across an entire city is called?"
          options={["LAN", "PAN", "MAN", "WAN"]}
          answer="MAN"
        />
        <QuickCheck
          question="Which protocol is used to send email?"
          options={["POP3", "IMAP", "SMTP", "FTP"]}
          answer="SMTP"
        />
        <QuickCheck
          question="A 48-bit hardware address on a NIC is called?"
          answer="MAC"
          hint="Stands for Media Access Control."
        />
      </Section>
    </ChapterLayout>
  );
}
